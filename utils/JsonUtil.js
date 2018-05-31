exports.response =function(res,code,data,message){
    var str = {
      "code": code,
      "data": data,
      "message": message
    };
    res.end(JSON.stringify(str));
  };