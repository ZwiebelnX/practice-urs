
const constValue = {
  tools: [{
    idx: 1,
    label: '基础内容',
    children: [{
      idx: 2,
      label: '单行文本',
      extension: 'text',
      name: '',
      type: 'text',
      defaultValue: '',
      unique: false,
      description: '',
      tip: '',
      require: false,
      case: [],
      caseEditable: false,
      rangeName: '字数',
      range: [],
      useRange: false
    },
      {
        idx: 3,
        label: '数字',
        extension: 'number',
        name: '',
        type: 'number',
        defaultValue: '0',
        unique: false,
        description: '',
        tip: '',
        require: false,
        case: [],
        caseEditable: false,
        rangeName: '值',
        range: [],
        useRange: false
      },
      {
        idx: 4,
        label: '单选框',
        extension: 'radio',
        name: '',
        type: 'radio',
        defaultValue: '',
        unique: false,
        description: '',
        tip: '',
        require: false,
        caseEditable: true,
        case: [],
        rangeName: '',
        range: [],
        useRange: false
      },
      {
        idx: 5,
        label: '复选框',
        extension: 'checkbox',
        name: '',
        type: 'checkbox',
        defaultValue: '',
        unique: false,
        description: '',
        tip: '',
        require: false,
        caseEditable: true,
        case: [],
        rangeName: '选择项数',
        range: [],
        useRange: false
      },
      {
        idx: 6,
        label: '日期',
        extension: 'date',
        name: '',
        type: 'date',
        defaultValue: '',
        unique: false,
        description: '',
        tip: '',
        require: false,
        caseEditable: false,
        case: [],
        rangeName: '日期',
        range: [],
        useRange: false
      },
      {
        idx: 7,
        label: '多行文本',
        extension: 'textarea',
        name: '',
        type: 'textarea',
        defaultValue: '',
        unique: false,
        description: '',
        tip: '',
        require: false,
        caseEditable: false,
        case: [],
        rangeName: '字数',
        range: [],
        useRange: false
      },
      {
        idx: 8,
        label: '分组',
        extension: 'group',
        name: '',
        type: '',
        defaultValue: '',
        unique: false,
        description: '',
        tip: '',
        require: false,
        caseEditable: false,
        case: [],
        rangeName: '',
        range: [],
        useRange: false
      }]
  }, {
    idx: 9,
    label: '扩展内容',
    children: [{
      idx: 10,
      label: '姓名',
      extension: 'personName',
      name: '姓名',
      type: 'text',
      defaultValue: '',
      unique: false,
      description: '',
      tip: '请输入姓名',
      require: true,
      caseEditable: false,
      case: [],
      rangeName: '姓名长度',
      range: [2, 20],
      useRange: true
    },
      {
        idx: 11,
        label: '队伍名称',
        extension: 'teamName',
        name: '队伍名称',
        type: 'text',
        defaultValue: '',
        unique: true,
        description: '',
        tip: '请输入队伍名称',
        require: true,
        caseEditable: false,
        case: [],
        rangeName: '队名长度',
        range: [1, 100],
        useRange: false
      },
      {
        idx: 12,
        label: '性别',
        extension: 'sex',
        name: '性别',
        type: 'sex',
        defaultValue: '',
        unique: false,
        description: '',
        tip: '请选择性别',
        require: true,
        caseEditable: false,
        case: ['男', '女'],
        rangeName: '',
        range: [],
        useRange: false
      },
      {
        idx: 13,
        label: '民族',
        extension: 'nation',
        name: '民族',
        type: 'nation',
        defaultValue: '汉族',
        unique: false,
        description: '',
        tip: '请选择民族',
        require: true,
        caseEditable: false,
        case: [],
        // 就不提供民族表了
        rangeName: '',
        range: [],
        useRange: false
      },
      {
        idx: 14,
        label: '政治面貌',
        extension: 'political',
        name: '政治面貌',
        type: 'radio',
        defaultValue: '',
        unique: false,
        description: '',
        tip: '请选择政治面貌',
        require: true,
        caseEditable: true,
        case: ['群众', '团员', '预备党员', '党员'],
        rangeName: '',
        range: [],
        useRange: false
      },
      {
        idx: 15,
        label: '学号',
        extension: 'studentNumber',
        name: '学号',
        type: 'studentNumber',
        defaultValue: '',
        unique: true,
        description: '',
        tip: '请输入学号',
        require: true,
        caseEditable: false,
        rangeName: '',
        range: [],
        useRange: false
      },
      {
        idx: 16,
        label: '手机号',
        extension: 'phone',
        name: '手机号',
        type: 'phone',
        defaultValue: '',
        unique: true,
        description: '',
        tip: '请输入手机号',
        require: false,
        caseEditable: false,
        rangeName: '',
        range: [],
        useRange: false
      },
      {
        idx: 17,
        label: 'QQ号',
        extension: 'qq',
        name: 'QQ号',
        type: 'qq',
        defaultValue: '',
        unique: true,
        description: '',
        tip: '请输入QQ号',
        require: false,
        caseEditable: false,
        rangeName: '',
        range: [],
        useRange: false
      },
      {
        idx: 18,
        label: '电子邮箱',
        extension: 'email',
        name: '电子邮箱',
        type: 'email',
        defaultValue: '',
        unique: true,
        description: '',
        tip: '请输入邮箱',
        require: false,
        caseEditable: false,
        rangeName: '',
        range: [],
        useRange: false
      },
      {
        idx: 19,
        label: '身份证号',
        extension: 'idcard',
        name: '身份证号',
        type: 'idcard',
        defaultValue: '',
        unique: true,
        description: '',
        tip: '请输入身份证号',
        require: true,
        caseEditable: false,
        rangeName: '',
        range: [],
        useRange: false
      },
      {
        idx: 20,
        label: 'GPA',
        extension: 'GPA',
        name: 'GPA',
        type: 'GPA',
        defaultValue: '',
        unique: false,
        description: '',
        tip: '',
        require: true,
        caseEditable: false,
        rangeName: 'GPA',
        range: [0, 4],
        useRange: false
      },
      {
        idx: 21,
        label: '排名',
        extension: 'rank',
        name: '排名',
        type: 'number',
        defaultValue: '',
        unique: false,
        description: '',
        tip: '',
        require: true,
        caseEditable: false,
        rangeName: '排名',
        range: [1, 10000],
        useRange: false
      }]
  }, {
    idx: 22,
    label: '预置模板',
    children: [{
      idx: 23,
      label: 'CCF报名'
    }]
  }],
  text: {
    idx: 1,
    name: '单行文本'
  },
  number: {
    idx: 2,
    name: '数字'
  },
  radio: {
    idx: 3,
    name: '单选框'
  },
  checkbox: {
    idx: 4,
    name: '复选框'
  },
  date: {
    idx: 5,
    name: '日期'
  },
  textarea: {
    idx: 6,
    name: '多行文本'
  },
  group: {
    idx: 7,
    name: '分组'
  },
  //
  personName: {
    idx: 8,
    name: '姓名'
  },
  teamName: {
    idx: 9,
    name: '队伍名称'
  },
  sex: {
    idx: 10,
    name: '性别'
  },
  nation: {
    idx: 11,
    name: '民族'
  },
  political: {
    idx: 12,
    name: '政治面貌'
  },
  studentNumber: {
    idx: 13,
    name: '学号'
  },
  phone: {
    idx: 14,
    name: '手机号'
  },
  qq: {
    idx: 15,
    name: 'QQ号'
  },
  email: {
    idx: 16,
    name: '电子邮箱'
  },
  idcard: {
    idx: 17,
    name: '身份证号'
  },
  GPA: {
    idx: 18,
    name: 'GPA'
  },
  rank: {
    idx: 19,
    name: '排名'
  },
  ccfTable: [{
    id: 1,
    idx: 10,
    label: '姓名',
    extension: 'personName',
    name: '姓名',
    type: 'text',
    defaultValue: '',
    unique: false,
    description: '',
    tip: '请输入姓名',
    require: true,
    case: [],
    caseEditable: false,
    rangeName: '姓名长度',
    range: [2, 20],
    useRange: true,
    children: []
  }, {
    id: 2,
    idx: 12,
    label: '性别',
    extension: 'sex',
    name: '性别',
    type: 'sex',
    defaultValue: '',
    unique: false,
    description: '',
    tip: '请选择性别',
    require: true,
    caseEditable: false,
    case: ['男', '女'],
    rangeName: '',
    range: [],
    useRange: false,
    children: []
  }, {
    id: 3,
    idx: 15,
    label: '学号',
    extension: 'studentNumber',
    name: '学号',
    type: 'studentNumber',
    defaultValue: '',
    unique: true,
    description: '',
    tip: '请输入学号',
    require: true,
    case: [],
    caseEditable: false,
    rangeName: '',
    range: [],
    useRange: false,
    children: []
  }, {
    id: 4,
    idx: 19,
    label: '身份证号',
    extension: 'idcard',
    name: '身份证号',
    type: 'idcard',
    defaultValue: '',
    unique: true,
    description: '',
    tip: '请输入身份证号',
    require: true,
    case: [],
    caseEditable: false,
    rangeName: '',
    range: [],
    useRange: false,
    children: []
  }, {
    id: 5,
    idx: 16,
    label: '手机号',
    extension: 'phone',
    name: '手机号',
    type: 'phone',
    defaultValue: '',
    unique: true,
    description: '',
    tip: '请输入手机号',
    require: false,
    case: [],
    caseEditable: false,
    rangeName: '',
    range: [],
    useRange: false,
    children: []
  }, {
    id: 6,
    idx: 18,
    label: '电子邮箱',
    extension: 'email',
    name: '电子邮箱',
    type: 'email',
    defaultValue: '',
    unique: true,
    description: '',
    tip: '请输入邮箱',
    require: false,
    case: [],
    caseEditable: false,
    rangeName: '',
    range: [],
    useRange: false,
    children: []
  }]
}

export default constValue
