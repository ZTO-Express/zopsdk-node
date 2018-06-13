# 中通开放平台SDK（node.js）

## 环境
nodejs

## 使用方式
```shell
npm install zopsdk-node

```


```javascript
var zop_client = require("zopsdk-node");

// int方法的两个参数companyid和key，都需要注册中通开放平台后到个人中心查看
zop_client.init("kfpttestCode", "kfpttestkey==");
let request_params = {};
// 此处是业务参数，请参考API文档中标明的"业务参数"
// request_param.参数名 = 参数值;
// 参数值可以是string，也可以是object，如果是object，本sdk内部会转为json处理
request_params.data = "{\"content\":{\"branchId\":\"\",\"buyer\":\"\",\"collectMoneytype\":\"CNY\",\"collectSum\":\"12.00\",\"freight\":\"10.00\",\"id\":\"xfs2018031500002222333\",\"orderSum\":\"0.00\",\"orderType\":\"1\",\"otherCharges\":\"0.00\",\"packCharges\":\"1.00\",\"premium\":\"0.50\",\"price\":\"126.50\",\"quantity\":\"2\",\"receiver\":{\"address\":\"育德路XXX号\",\"area\":\"501022\",\"city\":\"四川省,XXX,XXXX\",\"company\":\"XXXX有限公司\",\"email\":\"yyj@abc.com\",\"id\":\"130520142097\",\"im\":\"yangyijia-abc\",\"mobile\":\"136*****321\",\"name\":\"XXX\",\"phone\":\"010-222***89\",\"zipCode\":\"610012\"},\"remark\":\"请勿摔货\",\"seller\":\"\",\"sender\":{\"address\":\"华新镇华志路XXX号\",\"area\":\"310118\",\"city\":\"上海,上海市,青浦区\",\"company\":\"XXXXX有限公司\",\"email\":\"ll@abc.com\",\"endTime\":1369033200000,\"id\":\"131*****010\",\"im\":\"1924656234\",\"mobile\":\"1391***5678\",\"name\":\"XXX\",\"phone\":\"021-87***321\",\"startTime\":1369022400000,\"zipCode\":\"610012\"},\"size\":\"12,23,11\",\"tradeId\":\"2701843\",\"type\":\"1\",\"typeId\":\"\",\"weight\":\"0.753\"},\"datetime\":\"2018-3-30 12:00:00\",\"partner\":\"test\",\"verify\":\"ZTO123\"}";

let request = {
    url: "http://58.40.16.125:9001/submitOrderCode",
    params: request_params
};


// 本模块http请求使用的是node-fetch库，请自行百度
let response = zop_client.execute(request);
response.then(res => res.text())
    .then(body => console.log(body));
```

## 其他
1. 该项目刚创建，功能还很不完善，如有问题请提issue
2. 由于中通开放平台各个接口返回值格式没有统一，所以未封装返回值，未来可能会做封装
