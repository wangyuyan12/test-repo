/*include 'index_rpc.thrift'
include 'sku_rpc.thrift'*/

include 'index.thrift'
include 'sku.thrift'
include 'exception.thrift'

enum Operation {
	ADD = 1,
	SUBTRACT = 2,
	MULTIPLY = 3,
	DIVIDE = 4
}

//Object work
struct Work {
	1: i32 num1=0,
	2: i32 num2,
	3: Operation op,
	4: optional string comment,
}

// exceptions 
exception InvalidOperation {
	1: i32 whatOp,
	2: string why,
}

// server
service Calculator {
	string ping(1: string chinese),
	i32 add(1:i32 num1, 2:i32 num2),
	i32 calculator(1:i32 logid, 2: Work w) throws (1: InvalidOperation ouch),
}