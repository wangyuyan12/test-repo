"use strict";
//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var exception_ttypes = require('./exception_types')


var ttypes = module.exports = {};
var HomeBanner = module.exports.HomeBanner = function(args) {
  this.img_url = null;
  this.goto_url = null;
  if (args) {
    if (args.img_url !== undefined) {
      this.img_url = args.img_url;
    }
    if (args.goto_url !== undefined) {
      this.goto_url = args.goto_url;
    }
  }
};
HomeBanner.prototype = {};
HomeBanner.prototype.read = function(input) {
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
        this.img_url = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.goto_url = input.readString();
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

HomeBanner.prototype.write = function(output) {
  output.writeStructBegin('HomeBanner');
  if (this.img_url !== null && this.img_url !== undefined) {
    output.writeFieldBegin('img_url', Thrift.Type.STRING, 1);
    output.writeString(this.img_url);
    output.writeFieldEnd();
  }
  if (this.goto_url !== null && this.goto_url !== undefined) {
    output.writeFieldBegin('goto_url', Thrift.Type.STRING, 2);
    output.writeString(this.goto_url);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var NewSku = module.exports.NewSku = function(args) {
  this.id = null;
  this.cover_pic = null;
  this.name = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.cover_pic !== undefined) {
      this.cover_pic = args.cover_pic;
    }
    if (args.name !== undefined) {
      this.name = args.name;
    }
  }
};
NewSku.prototype = {};
NewSku.prototype.read = function(input) {
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
        this.cover_pic = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
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

NewSku.prototype.write = function(output) {
  output.writeStructBegin('NewSku');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.cover_pic !== null && this.cover_pic !== undefined) {
    output.writeFieldBegin('cover_pic', Thrift.Type.STRING, 2);
    output.writeString(this.cover_pic);
    output.writeFieldEnd();
  }
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 3);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ProxyInfo = module.exports.ProxyInfo = function(args) {
  this.eid = null;
  this.avatar = null;
  this.nick = null;
  this.proxy_type = null;
  this.areas = null;
  this.inds = null;
  this.province_num = null;
  this.city_num = null;
  this.hospital_num = null;
  if (args) {
    if (args.eid !== undefined) {
      this.eid = args.eid;
    }
    if (args.avatar !== undefined) {
      this.avatar = args.avatar;
    }
    if (args.nick !== undefined) {
      this.nick = args.nick;
    }
    if (args.proxy_type !== undefined) {
      this.proxy_type = args.proxy_type;
    }
    if (args.areas !== undefined) {
      this.areas = args.areas;
    }
    if (args.inds !== undefined) {
      this.inds = args.inds;
    }
    if (args.province_num !== undefined) {
      this.province_num = args.province_num;
    }
    if (args.city_num !== undefined) {
      this.city_num = args.city_num;
    }
    if (args.hospital_num !== undefined) {
      this.hospital_num = args.hospital_num;
    }
  }
};
ProxyInfo.prototype = {};
ProxyInfo.prototype.read = function(input) {
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
        this.eid = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.avatar = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.nick = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.proxy_type = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.areas = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.inds = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.I32) {
        this.province_num = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.I32) {
        this.city_num = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.I32) {
        this.hospital_num = input.readI32();
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

ProxyInfo.prototype.write = function(output) {
  output.writeStructBegin('ProxyInfo');
  if (this.eid !== null && this.eid !== undefined) {
    output.writeFieldBegin('eid', Thrift.Type.STRING, 1);
    output.writeString(this.eid);
    output.writeFieldEnd();
  }
  if (this.avatar !== null && this.avatar !== undefined) {
    output.writeFieldBegin('avatar', Thrift.Type.STRING, 2);
    output.writeString(this.avatar);
    output.writeFieldEnd();
  }
  if (this.nick !== null && this.nick !== undefined) {
    output.writeFieldBegin('nick', Thrift.Type.STRING, 3);
    output.writeString(this.nick);
    output.writeFieldEnd();
  }
  if (this.proxy_type !== null && this.proxy_type !== undefined) {
    output.writeFieldBegin('proxy_type', Thrift.Type.STRING, 4);
    output.writeString(this.proxy_type);
    output.writeFieldEnd();
  }
  if (this.areas !== null && this.areas !== undefined) {
    output.writeFieldBegin('areas', Thrift.Type.STRING, 5);
    output.writeString(this.areas);
    output.writeFieldEnd();
  }
  if (this.inds !== null && this.inds !== undefined) {
    output.writeFieldBegin('inds', Thrift.Type.STRING, 6);
    output.writeString(this.inds);
    output.writeFieldEnd();
  }
  if (this.province_num !== null && this.province_num !== undefined) {
    output.writeFieldBegin('province_num', Thrift.Type.I32, 7);
    output.writeI32(this.province_num);
    output.writeFieldEnd();
  }
  if (this.city_num !== null && this.city_num !== undefined) {
    output.writeFieldBegin('city_num', Thrift.Type.I32, 8);
    output.writeI32(this.city_num);
    output.writeFieldEnd();
  }
  if (this.hospital_num !== null && this.hospital_num !== undefined) {
    output.writeFieldBegin('hospital_num', Thrift.Type.I32, 9);
    output.writeI32(this.hospital_num);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var GoodEnterperise = module.exports.GoodEnterperise = function(args) {
  this.id = null;
  this.logo_url = null;
  this.name = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.logo_url !== undefined) {
      this.logo_url = args.logo_url;
    }
    if (args.name !== undefined) {
      this.name = args.name;
    }
  }
};
GoodEnterperise.prototype = {};
GoodEnterperise.prototype.read = function(input) {
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
        this.logo_url = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
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

GoodEnterperise.prototype.write = function(output) {
  output.writeStructBegin('GoodEnterperise');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.logo_url !== null && this.logo_url !== undefined) {
    output.writeFieldBegin('logo_url', Thrift.Type.STRING, 2);
    output.writeString(this.logo_url);
    output.writeFieldEnd();
  }
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 3);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var MedicalMessage = module.exports.MedicalMessage = function(args) {
  this.id = null;
  this.title = null;
  this.create_time = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.title !== undefined) {
      this.title = args.title;
    }
    if (args.create_time !== undefined) {
      this.create_time = args.create_time;
    }
  }
};
MedicalMessage.prototype = {};
MedicalMessage.prototype.read = function(input) {
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
        this.title = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.create_time = input.readString();
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

MedicalMessage.prototype.write = function(output) {
  output.writeStructBegin('MedicalMessage');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.title !== null && this.title !== undefined) {
    output.writeFieldBegin('title', Thrift.Type.STRING, 2);
    output.writeString(this.title);
    output.writeFieldEnd();
  }
  if (this.create_time !== null && this.create_time !== undefined) {
    output.writeFieldBegin('create_time', Thrift.Type.STRING, 3);
    output.writeString(this.create_time);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var HiringInfo = module.exports.HiringInfo = function(args) {
  this.id = null;
  this.job_type = null;
  this.company = null;
  this.salary_min = null;
  this.salary_max = null;
  this.area = null;
  this.create_time = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.job_type !== undefined) {
      this.job_type = args.job_type;
    }
    if (args.company !== undefined) {
      this.company = args.company;
    }
    if (args.salary_min !== undefined) {
      this.salary_min = args.salary_min;
    }
    if (args.salary_max !== undefined) {
      this.salary_max = args.salary_max;
    }
    if (args.area !== undefined) {
      this.area = args.area;
    }
    if (args.create_time !== undefined) {
      this.create_time = args.create_time;
    }
  }
};
HiringInfo.prototype = {};
HiringInfo.prototype.read = function(input) {
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
        this.job_type = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.company = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.salary_min = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.salary_max = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.area = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.create_time = input.readString();
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

HiringInfo.prototype.write = function(output) {
  output.writeStructBegin('HiringInfo');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.job_type !== null && this.job_type !== undefined) {
    output.writeFieldBegin('job_type', Thrift.Type.STRING, 2);
    output.writeString(this.job_type);
    output.writeFieldEnd();
  }
  if (this.company !== null && this.company !== undefined) {
    output.writeFieldBegin('company', Thrift.Type.STRING, 3);
    output.writeString(this.company);
    output.writeFieldEnd();
  }
  if (this.salary_min !== null && this.salary_min !== undefined) {
    output.writeFieldBegin('salary_min', Thrift.Type.I32, 4);
    output.writeI32(this.salary_min);
    output.writeFieldEnd();
  }
  if (this.salary_max !== null && this.salary_max !== undefined) {
    output.writeFieldBegin('salary_max', Thrift.Type.I32, 5);
    output.writeI32(this.salary_max);
    output.writeFieldEnd();
  }
  if (this.area !== null && this.area !== undefined) {
    output.writeFieldBegin('area', Thrift.Type.STRING, 6);
    output.writeString(this.area);
    output.writeFieldEnd();
  }
  if (this.create_time !== null && this.create_time !== undefined) {
    output.writeFieldBegin('create_time', Thrift.Type.STRING, 7);
    output.writeString(this.create_time);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var LoginStatus = module.exports.LoginStatus = function(args) {
  this.eid = null;
  this.nick = null;
  this.role_ids = null;
  this.avatar = null;
  this.is_enterprise = null;
  if (args) {
    if (args.eid !== undefined) {
      this.eid = args.eid;
    }
    if (args.nick !== undefined) {
      this.nick = args.nick;
    }
    if (args.role_ids !== undefined) {
      this.role_ids = args.role_ids;
    }
    if (args.avatar !== undefined) {
      this.avatar = args.avatar;
    }
    if (args.is_enterprise !== undefined) {
      this.is_enterprise = args.is_enterprise;
    }
  }
};
LoginStatus.prototype = {};
LoginStatus.prototype.read = function(input) {
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
        this.eid = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.nick = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.role_ids = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = input.readI16();
          this.role_ids.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.avatar = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.BOOL) {
        this.is_enterprise = input.readBool();
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

LoginStatus.prototype.write = function(output) {
  output.writeStructBegin('LoginStatus');
  if (this.eid !== null && this.eid !== undefined) {
    output.writeFieldBegin('eid', Thrift.Type.STRING, 1);
    output.writeString(this.eid);
    output.writeFieldEnd();
  }
  if (this.nick !== null && this.nick !== undefined) {
    output.writeFieldBegin('nick', Thrift.Type.STRING, 2);
    output.writeString(this.nick);
    output.writeFieldEnd();
  }
  if (this.role_ids !== null && this.role_ids !== undefined) {
    output.writeFieldBegin('role_ids', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.I16, this.role_ids.length);
    for (var iter7 in this.role_ids)
    {
      if (this.role_ids.hasOwnProperty(iter7))
      {
        iter7 = this.role_ids[iter7];
        output.writeI16(iter7);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.avatar !== null && this.avatar !== undefined) {
    output.writeFieldBegin('avatar', Thrift.Type.STRING, 4);
    output.writeString(this.avatar);
    output.writeFieldEnd();
  }
  if (this.is_enterprise !== null && this.is_enterprise !== undefined) {
    output.writeFieldBegin('is_enterprise', Thrift.Type.BOOL, 5);
    output.writeBool(this.is_enterprise);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

