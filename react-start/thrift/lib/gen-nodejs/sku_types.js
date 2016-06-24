"use strict";
//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var exception_ttypes = require('./exception_types')


var ttypes = module.exports = {};
var SkuList = module.exports.SkuList = function(args) {
  this.id = null;
  this.name = null;
  this.specs = null;
  this.otc = null;
  this.adva = null;
  this.cover_pic = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.name !== undefined) {
      this.name = args.name;
    }
    if (args.specs !== undefined) {
      this.specs = args.specs;
    }
    if (args.otc !== undefined) {
      this.otc = args.otc;
    }
    if (args.adva !== undefined) {
      this.adva = args.adva;
    }
    if (args.cover_pic !== undefined) {
      this.cover_pic = args.cover_pic;
    }
  }
};
SkuList.prototype = {};
SkuList.prototype.read = function(input) {
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
        this.id = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.specs = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.otc = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.adva = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.cover_pic = input.readString();
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

SkuList.prototype.write = function(output) {
  output.writeStructBegin('SkuList');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 2);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.specs !== null && this.specs !== undefined) {
    output.writeFieldBegin('specs', Thrift.Type.STRING, 3);
    output.writeString(this.specs);
    output.writeFieldEnd();
  }
  if (this.otc !== null && this.otc !== undefined) {
    output.writeFieldBegin('otc', Thrift.Type.STRING, 4);
    output.writeString(this.otc);
    output.writeFieldEnd();
  }
  if (this.adva !== null && this.adva !== undefined) {
    output.writeFieldBegin('adva', Thrift.Type.STRING, 5);
    output.writeString(this.adva);
    output.writeFieldEnd();
  }
  if (this.cover_pic !== null && this.cover_pic !== undefined) {
    output.writeFieldBegin('cover_pic', Thrift.Type.STRING, 6);
    output.writeString(this.cover_pic);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var SkuPicList = module.exports.SkuPicList = function(args) {
  this.url = null;
  if (args) {
    if (args.url !== undefined) {
      this.url = args.url;
    }
  }
};
SkuPicList.prototype = {};
SkuPicList.prototype.read = function(input) {
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
        this.url = input.readString();
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

SkuPicList.prototype.write = function(output) {
  output.writeStructBegin('SkuPicList');
  if (this.url !== null && this.url !== undefined) {
    output.writeFieldBegin('url', Thrift.Type.STRING, 1);
    output.writeString(this.url);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var SkuDetail = module.exports.SkuDetail = function(args) {
  this.name = null;
  this.otc = null;
  this.dosage_form = null;
  this.specs = null;
  this.factory = null;
  this.adva = null;
  this.component = null;
  this.properties = null;
  this.usage = null;
  this.storage = null;
  this.note = null;
  this.license_num = null;
  this.cover = null;
  this.ad_msg = null;
  if (args) {
    if (args.name !== undefined) {
      this.name = args.name;
    }
    if (args.otc !== undefined) {
      this.otc = args.otc;
    }
    if (args.dosage_form !== undefined) {
      this.dosage_form = args.dosage_form;
    }
    if (args.specs !== undefined) {
      this.specs = args.specs;
    }
    if (args.factory !== undefined) {
      this.factory = args.factory;
    }
    if (args.adva !== undefined) {
      this.adva = args.adva;
    }
    if (args.component !== undefined) {
      this.component = args.component;
    }
    if (args.properties !== undefined) {
      this.properties = args.properties;
    }
    if (args.usage !== undefined) {
      this.usage = args.usage;
    }
    if (args.storage !== undefined) {
      this.storage = args.storage;
    }
    if (args.note !== undefined) {
      this.note = args.note;
    }
    if (args.license_num !== undefined) {
      this.license_num = args.license_num;
    }
    if (args.cover !== undefined) {
      this.cover = args.cover;
    }
    if (args.ad_msg !== undefined) {
      this.ad_msg = args.ad_msg;
    }
  }
};
SkuDetail.prototype = {};
SkuDetail.prototype.read = function(input) {
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
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.otc = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.dosage_form = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.specs = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.factory = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.adva = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.component = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.STRING) {
        this.properties = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.STRING) {
        this.usage = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 10:
      if (ftype == Thrift.Type.STRING) {
        this.storage = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 11:
      if (ftype == Thrift.Type.STRING) {
        this.note = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 12:
      if (ftype == Thrift.Type.STRING) {
        this.license_num = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 13:
      if (ftype == Thrift.Type.STRING) {
        this.cover = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 14:
      if (ftype == Thrift.Type.STRING) {
        this.ad_msg = input.readString();
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

SkuDetail.prototype.write = function(output) {
  output.writeStructBegin('SkuDetail');
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 1);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.otc !== null && this.otc !== undefined) {
    output.writeFieldBegin('otc', Thrift.Type.STRING, 2);
    output.writeString(this.otc);
    output.writeFieldEnd();
  }
  if (this.dosage_form !== null && this.dosage_form !== undefined) {
    output.writeFieldBegin('dosage_form', Thrift.Type.STRING, 3);
    output.writeString(this.dosage_form);
    output.writeFieldEnd();
  }
  if (this.specs !== null && this.specs !== undefined) {
    output.writeFieldBegin('specs', Thrift.Type.STRING, 4);
    output.writeString(this.specs);
    output.writeFieldEnd();
  }
  if (this.factory !== null && this.factory !== undefined) {
    output.writeFieldBegin('factory', Thrift.Type.STRING, 5);
    output.writeString(this.factory);
    output.writeFieldEnd();
  }
  if (this.adva !== null && this.adva !== undefined) {
    output.writeFieldBegin('adva', Thrift.Type.STRING, 6);
    output.writeString(this.adva);
    output.writeFieldEnd();
  }
  if (this.component !== null && this.component !== undefined) {
    output.writeFieldBegin('component', Thrift.Type.STRING, 7);
    output.writeString(this.component);
    output.writeFieldEnd();
  }
  if (this.properties !== null && this.properties !== undefined) {
    output.writeFieldBegin('properties', Thrift.Type.STRING, 8);
    output.writeString(this.properties);
    output.writeFieldEnd();
  }
  if (this.usage !== null && this.usage !== undefined) {
    output.writeFieldBegin('usage', Thrift.Type.STRING, 9);
    output.writeString(this.usage);
    output.writeFieldEnd();
  }
  if (this.storage !== null && this.storage !== undefined) {
    output.writeFieldBegin('storage', Thrift.Type.STRING, 10);
    output.writeString(this.storage);
    output.writeFieldEnd();
  }
  if (this.note !== null && this.note !== undefined) {
    output.writeFieldBegin('note', Thrift.Type.STRING, 11);
    output.writeString(this.note);
    output.writeFieldEnd();
  }
  if (this.license_num !== null && this.license_num !== undefined) {
    output.writeFieldBegin('license_num', Thrift.Type.STRING, 12);
    output.writeString(this.license_num);
    output.writeFieldEnd();
  }
  if (this.cover !== null && this.cover !== undefined) {
    output.writeFieldBegin('cover', Thrift.Type.STRING, 13);
    output.writeString(this.cover);
    output.writeFieldEnd();
  }
  if (this.ad_msg !== null && this.ad_msg !== undefined) {
    output.writeFieldBegin('ad_msg', Thrift.Type.STRING, 14);
    output.writeString(this.ad_msg);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

