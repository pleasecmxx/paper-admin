export const getValidCode = '/api/get_captcha';
export const loginApi = '/api/management_login';
export const userInfoApi = '/api/get_user_info';

/******** 通用文件上传 ****/

export const common_uploader = '/api/management_uploadfiles';
export const comon_image_uploader = '/api/management_uploadfile_new'

/******* 平台-代理管理*********/

export const platform_user_manage_agent_list = '/api/management/search_agent';
export const platform_user_manage_create_agent = '/api/management/create_agent';

// export const


/***** 平台-店铺管理 ********/

export const platform_user_manage_shop_list = '/api/management/shop_search';


/****** 平台-基础配置 *******/

export const platform_base_config = '/api/management/platform_base_config';
export const platform_banner_uploader = '/api/management/platform/upload_banner';   //平台轮播上传
export const platform_banner_list = '/api/management/platform/banner_search';  //平台轮播图列表查询
export const platfrom_banner_delete = '/api/management/platform/banner_delete';  //平台轮播删除

/******** 平台-加盟渠道配置 */

export const addChannel = '/api/management/platform_channel_config';              //新增加盟渠道
export const channelList = '/api/management/channel_config_list';                  //加盟渠道列表
export const deletChanelApi = '/api/management/channel_config_delete';                //加盟渠道删除

/********************** 平台-问答配置 ***************/

export const addSolution = '/api/management/platform/questions_answers_create';   //新增问答
export const solutionList = '/api/management/platform/questions_answers_list';    //问答列表
export const editSolution = '/api/management/platform/questions_answers_edit';    //编辑问答
export const deleteSolution = 'api/management/platform/questions_answers_delete'; //删除问答

export const paperOrderListApi = 'api/management/platform/check_duplicate_order_list'; //平台端订单列表查询

export const takeCashPlatformListApi = 'api/management/platform/withdrawal_list'

/****************** 店铺端 *********************/

export const shopBannerList = '/api/management/shop/banner_list';   //店铺列表
export const shopBannerAddApi = 'api/management/shop/upload_banner';  //店铺banner添加接口
export const shopConfigApi = 'api/management/shop/config_edit';     //店铺配置
export const shopConfigQuery = 'api/management/shop/config_search'; //店铺配置查询
export const shopPricePriceCreateApi = 'api/management/shop/print_price_config';    //店铺打印定价创建
export const shopPrintPriceEditApi = 'api/management/shop/print_price_config_edit';  //店铺打印定价编辑
export const shopPricePriceQueryApi = 'api/management/shop/print_price_config_search';  //店铺打印定价查询
export const shopBannerDeleteApi = '/api/management/shop/banner_delete';  //店铺banner删除
export const shopChannelList = '/api/checkparper/channel_config_list';  //C端渠道列表
export const shopPaperOrderListApi = 'api/management/shop/shop_order_list';
export const canTakeCashMoneyQuery = 'api/management/withdrawal_number_query';  //可提现金额查询
export const askTackCashApi = 'api/management/withdrawal_application';  //提现申请接口

export const takeCashRecordListApi = 'api/management/withdrawal_recordList_list';  //提现记录

export const confirmPassOrNotTakeCashApi = 'api/management/platdorm/withdraw_review';

/***************** 代理端 *******************/

export const agentShopList = 'api/management/agent/shop_list';   //店铺列表
export const agentCreateShopApi = 'api/management/agent/shop_create'  //代理创建店铺
export const agentEditShopApi = 'api/management/agent/shop_edit'; //代理编辑店铺
export const agentOrderListApi = 'api/management/agent/agent_order_list';  //代理


export const editPasswordApi = 'api/management/edit_password';  //编辑密码接口

export const eidtChannleApi = '/api/management/channel_config_edit';  //编辑加盟渠道
