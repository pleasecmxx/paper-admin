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
