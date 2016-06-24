include "exception.thrift"
//首页 banner
struct HomeBanner {
    1: required string img_url,  //图片地址
    2: optional string goto_url,  //跳转地址
}

//最新发布产品
struct NewSku {
    1: required i32 id, //id
    2: required string cover_pic,  //产品图片
    3: required string name,  //产品名称
}

//代理商信息
struct ProxyInfo {
    1: required string eid,
    2: required string avatar,  //代理商图片
    3: required string nick,  //代理商名称
    4: required string proxy_type,  //代理类型
    5: required string areas,  //代理区域
    6: required string inds,  //关注适应症
    7: required i32 province_num,//省份数
    8: required i32 city_num,//城市数量
    9: required i32 hospital_num,//医院数量
}

//优质企业
struct GoodEnterperise {
    1: required i32 id, //id
    2: required string logo_url, //企业logo
    3: required string name, //企业名称
}

//医药资讯
struct MedicalMessage {
    1: required i32 id, //id
    2: required string title,  //资讯标题
    3: required string create_time,  //资讯发布时间
}

//求职招聘
struct HiringInfo {
    1: required i32 id, //id
    2: required string job_type, //招聘职位
    3: required string company, //公司名称
    4: required i32 salary_min,  //薪资
    5: required i32 salary_max,
    6: required string area,  //地区
    7: required string create_time,  //时间
}

//获取登入状态
struct LoginStatus {
    1: optional string eid,
    2: optional string nick, //用户
    3: list<i16> role_ids,//角色id
    4: string avatar,//用户头像
    5: bool is_enterprise//是否企业帐号
}

//服务端
service EyaosRPC {
    LoginStatus get_login_status(1:string session_id) throws (1:exception.EyaosRpcError error),  //获取登入信息
    list<HomeBanner> get_home_banners(1:i16 num),  //获取banner信息
    list<NewSku> get_new_skus(1:i16 num), //获取最新发布产品
    list<ProxyInfo> get_proxy_infos(1:i16 num), //获取代理信息
    list<GoodEnterperise> get_good_enterprises(1:i16 num),  //获取优质企业
    list<MedicalMessage> get_medical_messages(1:i16 num),  //获取医疗信息
    list<HiringInfo> get_hiring_infos(1:i16 num), //获取招聘信息
}
