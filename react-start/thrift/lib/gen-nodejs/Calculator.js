"use strict";
//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var index_ttypes = require('./index_types')
var sku_ttypes = require('./sku_types')
var exception_ttypes = require('./exception_types')


var ttypes = require('./entry_types');
//HELPER FUNCTIONS AND STRUCTURES

var Calculator_ping_args = function(args) {
  this.chinese = null;
  if (args) {
    if (args.chinese !== undefined) {
      this.chinese = args.chinese;
    }
  }
};
Calculator_ping_args.prototype = {};
Calculator_ping_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRING) {
        this.chinese = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Calculator_ping_args.prototype.write = function(output) {
  output.writeStructBegin('Calculator_ping_args');
  if (this.chinese !== null && this.chinese !== undefined) {
    output.writeFieldBegin('chinese', Thrift.Type.STRING, 1);
    output.writeString(this.chinese);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Calculator_ping_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
Calculator_ping_result.prototype = {};
Calculator_ping_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Calculator_ping_result.prototype.write = function(output) {
  output.writeStructBegin('Calculator_ping_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Calculator_add_args = function(args) {
  this.num1 = null;
  this.num2 = null;
  if (args) {
    if (args.num1 !== undefined) {
      this.num1 = args.num1;
    }
    if (args.num2 !== undefined) {
      this.num2 = args.num2;
    }
  }
};
Calculator_add_args.prototype = {};
Calculator_add_args.prototype.read = function(input) {
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
        this.num1 = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.num2 = input.readI32();
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

Calculator_add_args.prototype.write = function(output) {
  output.writeStructBegin('Calculator_add_args');
  if (this.num1 !== null && this.num1 !== undefined) {
    output.writeFieldBegin('num1', Thrift.Type.I32, 1);
    output.writeI32(this.num1);
    output.writeFieldEnd();
  }
  if (this.num2 !== null && this.num2 !== undefined) {
    output.writeFieldBegin('num2', Thrift.Type.I32, 2);
    output.writeI32(this.num2);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Calculator_add_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
Calculator_add_result.prototype = {};
Calculator_add_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.I32) {
        this.success = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Calculator_add_result.prototype.write = function(output) {
  output.writeStructBegin('Calculator_add_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.I32, 0);
    output.writeI32(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Calculator_calculator_args = function(args) {
  this.logid = null;
  this.w = null;
  if (args) {
    if (args.logid !== undefined) {
      this.logid = args.logid;
    }
    if (args.w !== undefined) {
      this.w = args.w;
    }
  }
};
Calculator_calculator_args.prototype = {};
Calculator_calculator_args.prototype.read = function(input) {
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
        this.logid = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.w = new ttypes.Work();
        this.w.read(input);
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

Calculator_calculator_args.prototype.write = function(output) {
  output.writeStructBegin('Calculator_calculator_args');
  if (this.logid !== null && this.logid !== undefined) {
    output.writeFieldBegin('logid', Thrift.Type.I32, 1);
    output.writeI32(this.logid);
    output.writeFieldEnd();
  }
  if (this.w !== null && this.w !== undefined) {
    output.writeFieldBegin('w', Thrift.Type.STRUCT, 2);
    this.w.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Calculator_calculator_result = function(args) {
  this.success = null;
  this.ouch = null;
  if (args instanceof ttypes.InvalidOperation) {
    this.ouch = args;
    return;
  }
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
    if (args.ouch !== undefined) {
      this.ouch = args.ouch;
    }
  }
};
Calculator_calculator_result.prototype = {};
Calculator_calculator_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.I32) {
        this.success = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ouch = new ttypes.InvalidOperation();
        this.ouch.read(input);
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

Calculator_calculator_result.prototype.write = function(output) {
  output.writeStructBegin('Calculator_calculator_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.I32, 0);
    output.writeI32(this.success);
    output.writeFieldEnd();
  }
  if (this.ouch !== null && this.ouch !== undefined) {
    output.writeFieldBegin('ouch', Thrift.Type.STRUCT, 1);
    this.ouch.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculatorClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
CalculatorClient.prototype = {};
CalculatorClient.prototype.ping = function(chinese, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_ping(chinese);
};

CalculatorClient.prototype.send_ping = function(chinese) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('ping', Thrift.MessageType.CALL, this.seqid);
  var args = new Calculator_ping_args();
  args.chinese = chinese;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

CalculatorClient.prototype.recv_ping = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new Calculator_ping_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('ping failed: unknown result');
};
CalculatorClient.prototype.add = function(num1, num2, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_add(num1, num2);
};

CalculatorClient.prototype.send_add = function(num1, num2) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('add', Thrift.MessageType.CALL, this.seqid);
  var args = new Calculator_add_args();
  args.num1 = num1;
  args.num2 = num2;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

CalculatorClient.prototype.recv_add = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new Calculator_add_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('add failed: unknown result');
};
CalculatorClient.prototype.calculator = function(logid, w, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_calculator(logid, w);
};

CalculatorClient.prototype.send_calculator = function(logid, w) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('calculator', Thrift.MessageType.CALL, this.seqid);
  var args = new Calculator_calculator_args();
  args.logid = logid;
  args.w = w;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

CalculatorClient.prototype.recv_calculator = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new Calculator_calculator_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ouch) {
    return callback(result.ouch);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('calculator failed: unknown result');
};
var CalculatorProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
CalculatorProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

CalculatorProcessor.prototype.process_ping = function(seqid, input, output) {
  var args = new Calculator_ping_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.ping(args.chinese, function (err, result) {
    var result = new Calculator_ping_result((err != null ? err : {success: result}));
    output.writeMessageBegin("ping", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

CalculatorProcessor.prototype.process_add = function(seqid, input, output) {
  var args = new Calculator_add_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.add(args.num1, args.num2, function (err, result) {
    var result = new Calculator_add_result((err != null ? err : {success: result}));
    output.writeMessageBegin("add", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

CalculatorProcessor.prototype.process_calculator = function(seqid, input, output) {
  var args = new Calculator_calculator_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.calculator(args.logid, args.w, function (err, result) {
    var result = new Calculator_calculator_result((err != null ? err : {success: result}));
    output.writeMessageBegin("calculator", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}
