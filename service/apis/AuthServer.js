export default function AuthServer(ajax, config) {
  return {
    getUpdatePasswordUrl: (opt) =>
      ajax({
        url: '/open-api/forget-url',
        method: 'get',
        reLogin: false,
        ...opt,
      }),
    // 修改密码
    updatePassWord: (opt) =>
      ajax({
        url: '/updatePassWord',
        method: 'post',
        isResponse: true,
        ...opt,
      }),
    loginType: (opt) =>
      ajax({
        url: '/sys-auth/login-type',
        method: 'get',
        ...opt,
      }),
    // 获取操作日志
    maintainLog: (opt) =>
      ajax({
        url: `/maintain-log/page/${opt.cDype}/${opt.cDataId}`,
        method: 'get',
        ...opt,
      }),
    menu: {
      list: (opt) =>
        ajax({
          url: '/menus/',
          method: 'get',
          ...opt,
        }),
      add: (opt) =>
        ajax({
          url: '/menus/',
          method: 'post',
          ...opt,
        }),
      info: (opt) =>
        ajax({
          url: `/menus/${opt.cId}`,
          method: 'get',
          ...opt,
        }),
      edit: (opt) =>
        ajax({
          url: `/menus/${opt.c_id}/`,
          method: 'PUT',
          ...opt,
        }),
      del: (opt) =>
        ajax({
          url: `/menus/${opt.c_id}/`,
          method: 'delete',
          ...opt,
        }),
      currentUserMenus: (opt) =>
        ajax({
          url: `/menus/current-user-menu`,
          method: 'get',
          ...opt,
        }),
      // 修改菜单排序
      sort: (opt) =>
        ajax({
          url: `/menus/index`,
          method: 'PUT',
          ...opt,
        }),
    },
    // 公司操作
    corp: {
      list: (opt) =>
        ajax({
          url: '/corp/query-list',
          method: 'post',
          ...opt,
        }),
      add: (opt) =>
        ajax({
          url: '/corp/add',
          method: 'post',
          ...opt,
        }),
      look: (opt) =>
        ajax({
          url: '/corp/check',
          method: 'get',
          ...opt,
        }),
      edit: (opt) =>
        ajax({
          url: '/corp/update-info',
          method: 'post',
          ...opt,
        }),
      status: (opt) =>
        ajax({
          url: '/corp/update-status',
          method: 'post',
          ...opt,
        }),
    },
    shop: {
      list: (opt) =>
        ajax({
          url: '/shop/shopInfos',
          method: 'post',
          ...opt,
        }),
      add: (opt) =>
        ajax({
          url: '/shop/shopInfo',
          method: 'post',
          ...opt,
        }),
      look: (opt) =>
        ajax({
          url: `/shop/shopInfo-detail`,
          method: 'post',
          ...opt,
        }),
      edit: (opt) =>
        ajax({
          url: '/shop/shopInfo',
          method: 'put',
          ...opt,
        }),
      status: (opt) =>
        ajax({
          url: '/shop/shopInfo-update-Status',
          method: 'PATCH',
          ...opt,
        }),
      // 上传门市附件
      uploadImg: (opt) =>
        ajax({
          url: '/shop/uploadShopAttach',
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          ...opt,
        }),
      removeImg: (opt) =>
        ajax({
          url: `/shop/removeShopAttach/${opt.c_id}`,
          method: 'get',
          ...opt,
        }),
      CategoryCtiyList: (opt) =>
        ajax({
          url: `/shop/query-departure-city`,
          method: 'get',
          ...opt,
        }),
    },
    // 角色
    role: {
      list: (opt) =>
        ajax({
          url: '/role/query-list',
          method: 'post',
          ...opt,
        }),
      add: (opt) =>
        ajax({
          url: '/role/add',
          method: 'post',
          ...opt,
        }),
      del: (opt) =>
        ajax({
          url: `/role/${opt.cId}`,
          method: 'DELETE',
          ...opt,
        }),
      info: (opt) =>
        ajax({
          url: '/role/check',
          method: 'get',
          ...opt,
        }),
      edit: (opt) =>
        ajax({
          url: '/role/update-info',
          method: 'post',
          ...opt,
        }),
      roleMenu: (opt) =>
        ajax({
          url: '/role/query-menu',
          method: 'post',
          ...opt,
        }),
      roleRelation: (opt) =>
        ajax({
          url: '/role/relation-menu',
          method: 'post',
          ...opt,
        }),
    },
    // 部门
    department: {
      tree: (opt) => ajax({ url: '/department/tree', method: 'GET', ...opt }),
      add: (opt) => ajax({ url: '/department/add', method: 'post', ...opt }),
      // 根据组织id，查表头信息
      info: (opt) => ajax({ url: '/department/base', method: 'GET', ...opt }),
      // 根据参数查询组织表数据列表,搜索上级组织时使用
      parentOrg: (opt) => ajax({ url: '/department/list', method: 'GET', ...opt }),
      edit: (opt) => ajax({ url: '/department/update', method: 'post', ...opt }),
      userList: (opt) => ajax({ url: '/department/user-list', method: 'GET', ...opt }),
      closeUserList: (opt) => ajax({ url: '/department/user-list/close', method: 'GET', ...opt }),
      del: (opt) => ajax({ url: `/department/${opt.cId}`, method: 'delete', ...opt }),
    },
    // 人员
    user: {
      // 查询用户信息-外系统使用
      loginInfo: (opt) => ajax({ url: `/sysuserinfo/get-user-detail`, method: 'get', ...opt }),
      add: (opt) => ajax({ url: `/sysuserinfo/add`, method: 'post', ...opt }),
      update: (opt) => ajax({ url: `/sysuserinfo/update`, method: 'post', ...opt }),
      close: (opt) => ajax({ url: `/sysuserinfo/${opt.cId}`, method: 'delete', ...opt }),
      info: (opt) => ajax({ url: `/sysuserinfo/${opt.cId}`, method: 'get', ...opt }),
      oneAuth: (opt) => ajax({ url: `/sysuserinfo/authorize`, method: 'post', ...opt }),
      batchAuth: (opt) => ajax({ url: `/sysuserinfo/batch-authorize`, method: 'post', ...opt }),
      batchUpdateDep: (opt) =>
        ajax({ url: `/sysuserinfo/batch-change-department`, method: 'post', ...opt }),
      execlDownload: (opt) =>
        ajax({
          url: `/sysuserinfo/download-template`,
          file: true,
          responseType: 'blob',
          method: 'get',
          ...opt,
        }),
      orgDownload: (opt) =>
        ajax({
          url: `/department/exportAll`,
          file: true,
          responseType: 'blob',
          method: 'get',
          ...opt,
        }),
      importExecl: (opt) =>
        ajax({
          url: `/sysuserinfo/import-excel`,
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          ...opt,
        }),
      getOneUserRole: (opt) => ajax({ url: `/sysuserinfo/get-role`, method: 'get', ...opt }),
    },
    // 微信人员
    wxUser: {
      list: (opt) => ajax({ url: `/wx-user/select-list`, method: 'get', ...opt }),
      wxList: (opt) => ajax({ url: `/wx-user/select-list-wx`, method: 'get', ...opt }),
    },
    // 微信企业部门
    wxDepartment: {
      list: (opt) => ajax({ url: `/wx-department/select-list`, method: 'get', ...opt }),
    },
  }
}
