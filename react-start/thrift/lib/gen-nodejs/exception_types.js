"use strict";
//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = module.exports = {};
ttypes.ErrorCode = {
'Param_Error' : 1,
'Type_Error' : 2,
'No_Object_Error' : 3
};
var EyaosRpcError = module.exports.EyaosRpcError = function(args) {
  Thrift.TException.call(this, "EyaosRpcError")
  this.name = "EyaosRpcError"
  this.code = null;
  this.error_msg = null;
  if (args) {
    if (args.code !== undefined) {
      this.code = args.code;
    }
    if (args.error_msg !== undefined) {
      this.error_msg = args.error_msg;
    }
  }
};
Thrift.inherits(EyaosRpcError, Thrift.TException);
EyaosRpcError.prototype.name = 'EyaosRpcError';
EyaosRpcError.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.code = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.error_msg = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

EyaosRpcError.prototype.write = function(output) {
  output.writeStructBegin('EyaosRpcError');
  if (this.code !== null && this.code !== undefined) {
    output.writeFieldBegin('code', Thrift.Type.I32, 1);
    output.writeI32(this.code);
    output.writeFieldEnd();
  }
  if (this.error_msg !== null && this.error_msg !== undefined) {
    output.writeFieldBegin('error_msg', Thrift.Type.STRING, 2);
    output.writeString(this.error_msg);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};
