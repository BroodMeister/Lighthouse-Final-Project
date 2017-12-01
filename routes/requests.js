/*
this module handles requests for retrieval of data from
database or inserting/updating data by 'routing' the http
requests to the appropriate handlers.
*/
const express = require('express')
const router = express.Router()

module.exports = (dbHandler) => {

// request check if member exists - check members file for existence
  router.get('/exist', (req, res) => {
    console.log("exists req: ", req.query.member);
    dbHandler.checkMembExistsAuth("E", req.query.member)
    .then(exists => {
      const status = exists ? "1" : "0";
      res.send(status);
    })
  });

  // request check if member and password are valid
  router.get('/auth', (req, res) => {
    dbHandler.checkMembExistsAuth("A", req.query.member, req.query.password)
    .then(valid =>  {
      if(valid) {
        req.session.member = req.query.member;
        res.json("1");
      } else {
        res.json("0");
      }
    })
  });

  // request retrieval of member data
  router.get('/mbrRtv', (req, res)  =>  {
    console.log("query member: ", req.query.member)
    dbHandler.getMemberData(req.query.member)
    .then(data  =>  {
      console.log("retrieved member data: ", data);
    })
  });

// request retrieval of member selected restaurants
//  router.get('/getMbrSels', (req, res)  =>  {
//    dbHandler.getMemberSels(req.query.member)
//    .then(data  =>  {
//      console.log("retrieved member selections: ", data);
//      res.json(data);
//    })
//  });

  // request from the favorites **
  router.post('/getMyFavourites', (req, res)  =>  {

    console.log("restaurants array: ", req.body.restArr);
    // stringify the restaurants array representation
    restArr = req.body.restArr;
    arrStr  = "";
    restArr.forEach( (elem) => {
      if (arrStr.length == 0) {
        //arrStr = JSON.stringify(elem);
        arrStr = "'" + elem + "'";
      } else {
        //arrStr = arrStr + ", " + JSON.stringify(elem);
        arrStr = arrStr + ", " + "'" + elem + "'";
      }
    });

    console.log(arrStr);
    console.log(`this is the string ${arrStr}`);

    dbHandler.getMemberSels(req.session.member, arrStr)
      .then(data  =>  {
        console.log("retrieved member selections: ", data);
        res.json(data);
        console.log("request giving to us:",data);
    })
  });

  // add a new member
  router.post('/membAdd', (req, res)  =>  {
    //first check he does not exist
    dbHandler.checkMembExistsAuth("E", req.body.member)
    .then(exists => {
      //if not already exists, then add
      if (!exists)  {
        dbHandler.addMember(req.body);
        return "1";
      } else {
        return "0";
      }
    })
    .then(status => {
      console.log("add member: ", req.body.member, " status: ", status);
      res.send(status)
    })
  });

  // update member data
  router.post('/membUpd', (req, res) => {
    dbHandler.updMemberData(req.body.data)
    .then(status  =>  {
      console.log("upd member data: ", req.body.data, " status: ", status);
    })
  });

  // add a member selection (restaurant)
  router.post('/selAdd', (req, res) =>  {
    //extract component data from body
    const member    = req.session.member;
    const comments  = req.body.comments;
    const rest    =   req.body.restdata;
    const restid  =   rest.restid;
    //first check that member selection does not already exist -error otherwise
    dbHandler.checkMembSelExists(member, restid)
      .then(found =>  {
        if (found) {
            console.log("memberSel found: ", member, restid);
            res.send("0");
        } else  {
          //add restaurant if not already exists
          console.log("before check rest exists");
          dbHandler.checkRestExists(restid)
            .then(exists => {
              if (!exists)  {
                //add restaurant to restaurants table
                console.log("before adding rest: ", restid);
                dbHandler.addRest(rest)
                  .then(result => {
                    console.log("before add member sel after add rest:", member, restid);
                    dbHandler.addMemberSel({member: member, restid: restid, comments: ""})
                      .then(result => res.send("1"));
                  });
              } else {
                //add member selection to table
                console.log("before add member selection, no rest add: ", member, restid);
                dbHandler.addMemberSel({member: member, restid: restid, comments: ""})
                .then(result => res.send("1"));
              }
          })
        }
      })
  });

  // delete a member selection
  router.post('/selDel', (req, res) =>  {
    dbHandler.delMembSel(req.session.member, req.body.memberrest)
    //dbHandler.delMembSel(req.session.member, req.body.memberrest)
    .then(status  =>  {
      res.json("1");
    })
  });

  // get and post comments
  router.get('/getComments', (req, res) =>{
    dbHandler.getMembRestComments(req.session.member, req.query.memberrest)
    .then(data => res.json(data))
  });
  router.post('/putComments', (req, res)  => {
    dbHandler.putMembRestComments(req.session.member, req.body.memberrest, req.body.comments)
    .then(status => res.json("1"))
  });

  // logout requested - clear cookie
  router.post('/logout', (req, res) =>  {
    req.session = null;
    res.json("1");
  });

  return router
}
