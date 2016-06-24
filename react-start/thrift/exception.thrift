namespace py apps.thrift.exception
enum ErrorCode{
    Param_Error = 1
    Type_Error = 2
    No_Object_Error = 3
}

exception EyaosRpcError{
    1:ErrorCode code,
    2:string error_msg,
}
