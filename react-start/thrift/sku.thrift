include "exception.thrift"

// 招商产品列表
struct SkuList {
    1: required i32 id, //id
    2: required string name,  //名称
    3: required string specs, //规格
    4: required string otc,  //类型
    5: optional string adva, //优势
    6: optional string cover_pic, //封面
}

// 产品图片
struct SkuPicList {
    1: required string url, // 图片
}
// 产品详情
struct SkuDetail {
    1: required string name,  //名称
    2: required string otc,  //类型
    3: required string dosage_form, //剂型
    4: required string specs, //规格
    5: required string factory, //厂家
    6: optional string adva, //优势
    7: optional string component, //药品成分
    8: optional string properties, //性状
    9: optional string usage, //用法用量
    10: optional string storage, //贮存条件
    11: optional string note, //注意事项
    12: optional string license_num, //批准文号
    13: optional string cover, //封面图
    14: optional string ad_msg, //招商文案
}



//服务端
service SkuRPC {
    list<SkuList> get_sku_list(),  //获取产品列表信息
    list<SkuPicList> get_sku_pics(1: required i32 id),  //获取产品图片列表
    SkuDetail get_sku_detail(1: required i32 id), //获取产品详情
}

