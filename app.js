const CHANNELS = ['YouTube', 'Instagram', 'TikTok', 'X', 'Substack'];
const CATEGORIES = ['母婴', '家居百货', '美妆', '服饰时尚', '数码测评', 'AI科技', '金融投资', '日常生活', 'ASMR', '新闻资讯', '户外', '搞笑整活'];
const STATUSES = ['待回复邮件', '待审提报', '待议价', '确认合作', '待寄样', '待审样品', '待发brief', '待收脚本', '待审脚本', '待收样片', '待审样片', '待发布', '已发布'];
const STATUS_RANK = Object.fromEntries(STATUSES.map((name, i) => [name, i]));
const STATUS_PHASE = { '待回复邮件': 0, '待审提报': 0, '待议价': 0, '确认合作': 0, '待寄样': 0, '待审样品': 0, '待发brief': 1, '待收脚本': 1, '待审脚本': 1, '待收样片': 2, '待审样片': 2, '待发布': 3, '已发布': 3 };
const PHASES = ['报价与合作', '脚本', '样片', '发布'];
const BOOSTING = ['无', '7d', '14d', '30d', '60d', '90d', '180d', '365d', 'forever'];
const USAGE = ['无', '30d', '60d', '90d', '180d', '365d', 'forever'];
const OPERATOR_NAMES = [
  '朴银英','周一宁','陈可','许然','唐舒','刘雷欧','张元英','尚之桃','米兰达','卢米','金冬天','萨曼莎','梁淅沥','陈嘉玲',
  '林知夏','沈明月','顾清宁','苏念安','叶听澜','江若黎','温以宁','宋予棠','林栀子','顾南枝','许星晚','秦书瑶',
  '方可心','贺予安','乔伊','夏知微','苏念','陈漫','林清欢','周雨桐','江听雨','赵清和','顾明曦','周静姝',
  '黄思琪','吴悠','徐薇','朱晓宁','林诗雅','徐安然','张瑶','钱多多','孙可欣','李文静','马若曦','高云舒',
  '罗佳','梁一诺','郭悦','何雨晴','邓嘉','曹佳宁','彭欣','曾一凡','田恬','韩映雪','程可','袁一宁',
  '冯越','潘悦','于青青','董宁','魏可心','蒋灵','余香','杜若','沈芊','姚蔓','傅云','陆思',
  '费悦','薛珊','雷佳','白露','安如','文竹','苏月','贺兰','林夏','顾澄','池雨','蓝岚',
  '温言','柳茹','许梦','方晴','丁一','鲁雯','钟灵','黎曼','夏木','唐果','叶青','叶蓁',
  '孟秋','任月'
];
const GROUP_LEAD_NAMES = ['刘雷欧','张元英','卢米'];
const GROUPS = [...GROUP_LEAD_NAMES.map((name)=>`${name}组`), ...OPERATOR_NAMES.filter((name)=>!GROUP_LEAD_NAMES.includes(name)).slice(0,57).map((name)=>`${name}组`)];
const STORAGE_KEY = 'infruite-oms-v1';

const now = Date.now();
const daysAgo = (n) => new Date(now - n * 86400000).toISOString();
const makeOrderId = () => `2${String(Math.floor(Math.random() * 100000000000)).padStart(11, '0')}`;
const makeCreatorId = () => `1${String(Math.floor(Math.random() * 100000000000)).padStart(11, '0')}`;
const initialState = () => ({
  activePage: 'dashboard', activeUser: '朴银英', activeRole: '管理员', drawer: null, ordersPage: 1, creatorsPage: 1,
  orderFilters: {}, creatorFilters: {}, selectedCreators: [],
  orders: [
    { id:'200000421078', influencer:'Mia Chen', handle:'@miamakeshome', region:'美国 · 加州', price:2400, channel:'YouTube', format:'Dedicated', status:'待回复邮件', owner:'朴银英', group:'朴银英组', created:daysAgo(0), category:'家居百货', days:2, email:'mia@creator.example', tags:['家居收纳'], brief:'', script:'', sample:'', postLink:'', adCode:'', labels:[], rights:{boosting:'30d',usage:'90d'}, log:[['朴银英','创建合作订单',daysAgo(0)],['系统','邮件已发出，等待达人回复',daysAgo(0)]] },
    { id:'200000421079', influencer:'Sofia Rivera', handle:'@sofiasimplified', region:'美国 · 纽约', price:1850, channel:'Instagram', format:'Reels', status:'待审提报', owner:'朴银英', group:'朴银英组', created:daysAgo(1), category:'美妆', days:1, email:'sofia@creator.example', tags:['护肤'], brief:'', script:'', sample:'', postLink:'', adCode:'', labels:[], rights:{boosting:'14d',usage:'60d'}, log:[['朴银英','提交了达人提报，等待审核',daysAgo(1)]] },
    { id:'200000421080', influencer:'Daniel Park', handle:'@danielreviews', region:'韩国 · 首尔', price:3200, channel:'YouTube', format:'Integrated', status:'待审脚本', owner:'朴银英', group:'朴银英组', created:daysAgo(3), category:'数码测评', days:3, email:'daniel@creator.example', tags:['AI工具'], brief:'请围绕真实使用场景介绍产品优势，突出上手简单。', script:'开场：最近我用 AI 整理了我的工作流……', sample:'', postLink:'', adCode:'', labels:[], rights:{boosting:'30d',usage:'180d'}, log:[['朴银英','上传达人脚本',daysAgo(0)],['系统','脚本已提交，等待审核',daysAgo(0)]] },
    { id:'200000421081', influencer:'Emma Wilson', handle:'@emmarunsoutside', region:'英国 · 伦敦', price:970, channel:'TikTok', format:'Video', status:'待审样片', owner:'朴银英', group:'朴银英组', created:daysAgo(5), category:'户外', days:4, email:'emma@creator.example', tags:['户外装备'], brief:'展示产品在日常徒步中的使用方式。', script:'已审核通过', sample:'样片 v1 已收到，开场产品露出较晚。', postLink:'', adCode:'', labels:[], rights:{boosting:'7d',usage:'30d'}, log:[['朴银英','达人上传了样片，等待审核',daysAgo(1)]] },
    { id:'200000421082', influencer:'Ava Lifestyle', handle:'@avalivingwell', region:'澳大利亚 · 悉尼', price:1450, channel:'Instagram', format:'Carousel', status:'待发布', owner:'朴银英', group:'朴银英组', created:daysAgo(9), category:'日常生活', days:2, email:'ava@creator.example', tags:['好物分享'], brief:'请自然呈现日常使用体验。', script:'已审核通过', sample:'已审核通过', postLink:'', adCode:'', labels:[], rights:{boosting:'14d',usage:'90d'}, log:[['朴银英','样片审核通过，进入发布阶段',daysAgo(0)]] },
    { id:'200000421083', influencer:'Noah Kim', handle:'@noahbuildsai', region:'美国 · 华盛顿', price:4100, channel:'X', format:'Post', status:'待发布', owner:'周一宁', group:'周一宁组', created:daysAgo(11), category:'AI科技', days:6, email:'noah@creator.example', tags:['AI工具'], brief:'结合真实工作场景进行分享。', script:'已审核通过', sample:'已审核通过', postLink:'', adCode:'', labels:[], rights:{boosting:'30d',usage:'180d'}, log:[['周一宁','样片审核通过，进入发布阶段',daysAgo(1)]] },
    { id:'200000421084', influencer:'Olivia Hart', handle:'@oliviaslittleones', region:'加拿大 · 多伦多', price:1250, channel:'YouTube', format:'Shorts', status:'待发brief', owner:'朴银英', group:'朴银英组', created:daysAgo(2), category:'母婴', days:1, email:'olivia@creator.example', tags:['亲子'], brief:'', script:'', sample:'', postLink:'', adCode:'', labels:[], rights:{boosting:'7d',usage:'30d'}, log:[['朴银英','确认合作价格 $1,250',daysAgo(1)]] },
    { id:'200000421085', influencer:'Leo Martin', handle:'@leomartin.xyz', region:'法国 · 巴黎', price:890, channel:'Substack', format:'Article', status:'待收脚本', owner:'陈可', group:'陈可组', created:daysAgo(4), category:'金融投资', days:5, email:'leo@creator.example', tags:['个人理财'], brief:'文章中加入产品的使用体验与适用人群。', script:'', sample:'', postLink:'', adCode:'', labels:[], rights:{boosting:'无',usage:'90d'}, log:[['陈可','brief 已发送，等待脚本',daysAgo(2)]] },
    { id:'200000421086', influencer:'Jade Li', handle:'@jadeandco', region:'新加坡', price:2100, channel:'TikTok', format:'Video', status:'待寄样', owner:'周一宁', group:'周一宁组', created:daysAgo(6), category:'服饰时尚', days:2, email:'jade@creator.example', needsSample:true, tags:['穿搭'], brief:'请提供收件信息并确认样品寄送。', script:'', sample:'', postLink:'', adCode:'', labels:[], rights:{boosting:'30d',usage:'60d'}, log:[['周一宁','已确认合作，待寄样品',daysAgo(0)]] },
    { id:'200000421087', influencer:'Kai Sounds', handle:'@kaiaudios', region:'日本 · 东京', price:750, channel:'Instagram', format:'Reels', status:'待审样品', owner:'许然', group:'陈可组', created:daysAgo(7), category:'ASMR', days:8, email:'kai@creator.example', needsSample:true, tags:['音频'], brief:'收到样品后确认型号及外观。', script:'', sample:'', postLink:'', adCode:'', labels:[], rights:{boosting:'无',usage:'30d'}, log:[['许然','达人确认收到样品，请运营核对',daysAgo(3)]] },
    { id:'200000421088', influencer:'Nora Field Notes', handle:'@norafieldnotes', region:'美国 · 俄勒冈', price:1680, channel:'YouTube', format:'Dedicated', status:'已发布', owner:'朴银英', group:'朴银英组', created:daysAgo(23), category:'户外', days:0, email:'nora@creator.example', tags:['户外'], brief:'已发送', script:'已审核通过', sample:'已审核通过', postLink:'https://youtube.com/watch?v=demo', adCode:'AD-7Q2F', labels:['开箱','好物分享'], rights:{boosting:'30d',usage:'180d'}, log:[['朴银英','订单已完结',daysAgo(1)]] },
    { id:'200000421089', influencer:'Rae On Air', handle:'@raeonair', region:'美国 · 德州', price:5200, channel:'X', format:'Article', status:'待回复邮件', owner:'唐舒', group:'周一宁组', created:daysAgo(1), category:'新闻资讯', days:7, email:'rae@creator.example', tags:['科技资讯'], brief:'', script:'', sample:'', postLink:'', adCode:'', labels:[], rights:{boosting:'7d',usage:'30d'}, log:[['唐舒','首次合作邀约已发送',daysAgo(1)]] },
  ],
  creators: [
    { id:'100000392741', name:'Mia Chen', handle:'@miamakeshome', region:'美国 · 加州', channels:['YouTube','Instagram'], price:2200, submitted:daysAgo(6), submitter:'朴银英', owner:'朴银英', group:'朴银英组', language:'英语', category:'家居百货', state:'已触达', email:'mia@creator.example', reserveUntil:null, emailSentAt:daysAgo(5), socials:['https://youtube.com/@miamakeshome','https://instagram.com/miamakeshome'], log:[['朴银英','发送首次合作邮件',daysAgo(5)]] },
    { id:'100000392742', name:'Sofia Rivera', handle:'@sofiasimplified', region:'美国 · 纽约', channels:['Instagram'], price:1650, submitted:daysAgo(2), submitter:'朴银英', owner:'朴银英', group:'朴银英组', language:'英语 / 西班牙语', category:'美妆', state:'已入库', reserveUntil:daysAgo(-5), emailSentAt:null, socials:['https://instagram.com/sofiasimplified'], log:[['朴银英','入库并锁定达人',daysAgo(2)]] },
    { id:'100000392743', name:'Daniel Park', handle:'@danielreviews', region:'韩国 · 首尔', channels:['YouTube','TikTok'], price:3000, submitted:daysAgo(12), submitter:'陈可', owner:null, group:'', language:'韩语 / 英语', category:'数码测评', state:'公共池', reserveUntil:null, emailSentAt:null, socials:['https://youtube.com/@danielreviews'], log:[] },
    { id:'100000392744', name:'Emma Wilson', handle:'@emmarunsoutside', region:'英国 · 伦敦', channels:['TikTok','Instagram'], price:980, submitted:daysAgo(18), submitter:'周一宁', owner:'周一宁', group:'周一宁组', language:'英语', category:'户外', state:'已触达', reserveUntil:null, emailSentAt:daysAgo(13), socials:['https://tiktok.com/@emmarunsoutside'], log:[['周一宁','发送首次合作邮件',daysAgo(13)]] },
    { id:'100000392745', name:'Olivia Hart', handle:'@oliviaslittleones', region:'加拿大 · 多伦多', channels:['YouTube'], price:1180, submitted:daysAgo(1), submitter:'朴银英', owner:'朴银英', group:'朴银英组', language:'英语', category:'母婴', state:'已入库', reserveUntil:daysAgo(-6), emailSentAt:null, socials:['https://youtube.com/@oliviaslittleones'], log:[['朴银英','入库并锁定达人',daysAgo(1)]] },
    { id:'100000392746', name:'Noah Kim', handle:'@noahbuildsai', region:'美国 · 华盛顿', channels:['X','Substack'], price:3900, submitted:daysAgo(21), submitter:'许然', owner:null, group:'', language:'英语', category:'AI科技', state:'公共池', reserveUntil:null, emailSentAt:null, socials:['https://x.com/noahbuildsai'], log:[] },
    { id:'100000392747', name:'Jade Li', handle:'@jadeandco', region:'新加坡', channels:['TikTok'], price:1950, submitted:daysAgo(9), submitter:'周一宁', owner:'周一宁', group:'周一宁组', language:'英语 / 中文', category:'服饰时尚', state:'已触达', reserveUntil:null, emailSentAt:daysAgo(7), socials:['https://tiktok.com/@jadeandco'], log:[['周一宁','发送首次合作邮件',daysAgo(7)]] },
    { id:'100000392748', name:'Kai Sounds', handle:'@kaiaudios', region:'日本 · 东京', channels:['Instagram'], price:720, submitted:daysAgo(3), submitter:'许然', owner:null, group:'', language:'日语', category:'ASMR', state:'公共池', reserveUntil:null, emailSentAt:null, socials:['https://instagram.com/kaiaudios'], log:[] },
    { id:'100000392749', name:'Rae On Air', handle:'@raeonair', region:'美国 · 德州', channels:['X'], price:4700, submitted:daysAgo(5), submitter:'唐舒', owner:'唐舒', group:'周一宁组', language:'英语', category:'新闻资讯', state:'已入库', reserveUntil:daysAgo(-2), emailSentAt:null, socials:['https://x.com/raeonair'], log:[] },
  ],
  permissions: [
    { name:'朴银英', email:'y.liu@infruite.co', role:'管理员', group:'朴银英组', channels:[...CHANNELS], active:true },
    { name:'周一宁', email:'yining.zhou@infruite.co', role:'组长', group:'周一宁组', channels:['YouTube','Instagram','TikTok'], active:true },
    { name:'陈可', email:'ke.chen@infruite.co', role:'组员', group:'陈可组', channels:['YouTube','X','Substack'], active:true },
    { name:'许然', email:'ran.xu@infruite.co', role:'组员', group:'陈可组', channels:['Instagram','TikTok'], active:true },
    { name:'唐舒', email:'shu.tang@infruite.co', role:'组员', group:'周一宁组', channels:['YouTube','X'], active:true },
  ], requests: [], lastUploadReport: null
});

let state;
try { state = { ...initialState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { state = initialState(); }
if (!state.orders?.length) state.orders = initialState().orders;
if (!state.creators?.length) state.creators = initialState().creators;
state.activePage = 'dashboard';
const root = document.querySelector('#app');
const overlayRoot = document.querySelector('#overlay-root');

const icons = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  box:'<path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  arrow:'<path d="M5 12h14m-7-7 7 7-7 7"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  close:'<path d="m18 6-12 12M6 6l12 12"/>',
  down:'<path d="m7 10 5 5 5-5"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  filter:'<path d="M4 6h16M7 12h10m-7 6h4"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5m4-1v5l4 2"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
  star:'<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
  settings:'<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 1 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 1.6 12H1.5a2 2 0 1 1 0-4h.2a2 2 0 0 0 1.4-3.4L3 4.5a2 2 0 1 1 2.8-2.8l.1.1a2 2 0 0 0 3.4-1.4v-.2a2 2 0 1 1 4 0v.2a2 2 0 0 0 3.4 1.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a2 2 0 0 0 1.4 3.4h.2a2 2 0 1 1 0 4h-.2a2 2 0 0 0-1.4 3.4Z" transform="translate(2 2) scale(.83)"/>',
  external:'<path d="M15 3h6v6m-11 5L21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>',
  merge:'<path d="M8 7h8m-8 10h8M7 7l10 10M17 7 7 17"/>',
  split:'<path d="M12 3v18M12 12H5m0 0 3-3m-3 3 3 3m4-10h7m0 0-3-3m3 3-3 3"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'
};
const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.grid}</svg>`;
const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const money = (n) => n ? `$${Number(n).toLocaleString('en-US')}` : '—';
const dt = (value, withDate = true) => value ? new Intl.DateTimeFormat('zh-CN', withDate ? { month:'short', day:'numeric' } : { hour:'2-digit', minute:'2-digit' }).format(new Date(value)) : '—';
const dateLong = () => new Intl.DateTimeFormat('zh-CN', { year:'numeric', month:'long', day:'numeric', weekday:'long' }).format(new Date());
const currentPermission = () => state.permissions.find((u) => u.name === state.activeUser) || { group:'朴银英组', channels:[...CHANNELS], managedGroups:[...GROUPS] };
const isAdmin = () => state.activeRole === '管理员';
const visibleOrders = () => state.orders.filter((o) => isAdmin() || ((currentPermission().channels||[]).includes(o.channel) && (o.owner===state.activeUser || (state.activeRole==='组长'&&(currentPermission().managedGroups||[currentPermission().group]).includes(o.group)))));
const visibleCreators = () => state.creators.filter((c) => isAdmin() || (c.channels.some((ch)=>(currentPermission().channels||[]).includes(ch)) && (c.state==='公共池' || c.owner===state.activeUser || (state.activeRole==='组长'&&(currentPermission().managedGroups||[currentPermission().group]).includes(c.group)))));
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
function scaleDemoData(data, alreadyScaled) {
  const copy = (value) => JSON.parse(JSON.stringify(value));
  const oldPeople=(data.permissions||[]).map(copy);
  const oldOrders=(data.orders||[]).map(copy), oldCreators=(data.creators||[]).map(copy);
  const nameMap=new Map(oldPeople.map((person,index)=>[person.name,OPERATOR_NAMES[index]]).filter(([,name])=>name));
  const groupLeaderByGroup=Object.fromEntries(GROUPS.map((group,index)=>[group,GROUP_LEAD_NAMES[index%GROUP_LEAD_NAMES.length]]));
  let memberGroupIndex=0;
  const people=OPERATOR_NAMES.map((name,index)=>{
    const role=name==='朴银英'?'管理员':GROUP_LEAD_NAMES.includes(name)?'组长':'组员';
    const group=role==='组长'?`${name}组`:name==='朴银英'?'朴银英组':GROUPS[3+(memberGroupIndex++%57)];
    const old=oldPeople[index];
    const channels=role==='管理员'?[...CHANNELS]:(old?.channels?.length?old.channels:[CHANNELS[index%CHANNELS.length],CHANNELS[(index+2)%CHANNELS.length]]);
    const managedGroups=role==='管理员'?[...GROUPS]:role==='组长'?GROUPS.filter((g)=>groupLeaderByGroup[g]===name):[];
    return {name,email:`operator.${String(index+1).padStart(3,'0')}@infruite.example`,role,group,channels:[...new Set(channels)],managedGroups,active:true};
  });
  const personByName=new Map(people.map((person)=>[person.name,person]));
  const mappedName=(name,index=0)=>nameMap.get(name)||((name&&OPERATOR_NAMES.includes(name))?name:OPERATOR_NAMES[index%OPERATOR_NAMES.length]);
  const mapLog=(log)=>Array.isArray(log)?log.map((entry)=>[entry[0]==='系统'?'系统':nameMap.get(entry[0])||((entry[0]&&OPERATOR_NAMES.includes(entry[0]))?entry[0]:mappedName(entry[0],0)),...entry.slice(1)]):[];
  const mapOrder=(order,index)=>{order.owner=mappedName(order.owner,index);order.group=personByName.get(order.owner)?.group||'朴银英组';order.log=mapLog(order.log);return order;};
  const mapCreator=(creator,index)=>{creator.submitter=mappedName(creator.submitter,index);creator.owner=creator.owner?mappedName(creator.owner,index):null;creator.group=creator.owner?(personByName.get(creator.owner)?.group||''):'';creator.log=mapLog(creator.log);return creator;};
  data.permissions=people;
  data.groups=[...GROUPS];
  data.groupLeads=groupLeaderByGroup;
  data.activeUser='朴银英';data.activeRole='管理员';
  data.orders=oldOrders.map((order,index)=>mapOrder(order,index));
  data.creators=oldCreators.map((creator,index)=>mapCreator(creator,index));
  data.requests=(data.requests||[]).map((request,index)=>({...request,name:mappedName(request.name,index),group:personByName.get(mappedName(request.name,index))?.group||'朴银英组'}));
  if(!alreadyScaled){
    const baseOrders=data.orders.map(copy),baseCreators=data.creators.map(copy);
    const seenOrderIds=new Set(data.orders.map((o)=>o.id));
    for(let replica=1;replica<20;replica++)for(let i=0;i<baseOrders.length;i++){
      const source=baseOrders[i],person=people[(replica*baseOrders.length+i)%people.length];let id=makeOrderId();while(seenOrderIds.has(id))id=makeOrderId();seenOrderIds.add(id);
      const created=daysAgo((replica*7+i*3)%75);
      data.orders.push({...copy(source),id,influencer:`${source.influencer} ${String(replica+1).padStart(2,'0')}`,handle:`@creator_${String(replica).padStart(2,'0')}_${String(i+1).padStart(2,'0')}`,owner:person.name,group:person.group,created,days:(source.days+replica+i)%14,email:`creator.${replica}.${i+1}@infruite.example`,log:[[person.name,'订单已分配',created]],rights:{...source.rights},labels:[...(source.labels||[])]});
    }
    const seenCreatorIds=new Set(data.creators.map((c)=>c.id));
    for(let replica=1;replica<20;replica++)for(let i=0;i<baseCreators.length;i++){
      const source=baseCreators[i],person=people[(replica*baseCreators.length+i)%people.length];let id=makeCreatorId();while(seenCreatorIds.has(id))id=makeCreatorId();seenCreatorIds.add(id);
      const stateName=source.state,submitted=daysAgo((replica*5+i*3)%120);
      data.creators.push({...copy(source),id,name:`${source.name} ${String(replica+1).padStart(2,'0')}`,handle:`@creator_${String(replica).padStart(2,'0')}_${String(i+1).padStart(2,'0')}`,channels:[...source.channels],price:Math.max(250,(Number(source.price)||900)+((replica*137+i*83)%700-250)),submitted,submitter:person.name,owner:stateName==='公共池'?null:person.name,group:stateName==='公共池'?'':person.group,state:stateName,reserveUntil:stateName==='已入库'?new Date(Date.now()+((replica+i)%6+1)*86400000).toISOString():null,emailSentAt:stateName==='已触达'?daysAgo((replica+i)%50+1):null,email:`creator.${replica}.${i+1}@infruite.example`,socials:source.channels.map((ch)=>`https://${ch==='YouTube'?'youtube.com':ch==='Instagram'?'instagram.com':ch==='TikTok'?'tiktok.com':ch==='X'?'x.com':'substack.com'}/@creator_${replica}_${i+1}`),log:[[person.name,'已录入达人库',submitted]]});
    }
  }
}
if(state.demoScaleVersion!==21){scaleDemoData(state,state.demoScaleVersion>=20);state.demoScaleVersion=21;save();}
const addOrderLog = (order, message, actor = state.activeUser) => { order.log ||= []; order.log.unshift([actor, message, new Date().toISOString()]); };
const addCreatorLog = (creator, message, actor = state.activeUser) => { creator.log ||= []; creator.log.unshift([actor, message, new Date().toISOString()]); };
const closeDrawer = () => { state.drawer = null; render(); };
const openDrawer = (type, id = '') => { state.drawer = { type, id, tab: 0 }; renderDrawer(); };
const toast = (message, tone = 'success') => {
  const stack = document.querySelector('.toast-stack') || (() => { const el = document.createElement('div'); el.className = 'toast-stack'; document.body.append(el); return el; })();
  const node = document.createElement('div'); node.className = 'toast'; node.innerHTML = `<span class="toast-dot" style="background:${tone === 'error' ? 'var(--red)' : 'var(--green)'}"></span>${esc(message)}`; stack.append(node);
  setTimeout(() => { node.style.opacity = '0'; node.style.transform = 'translateY(5px)'; setTimeout(() => node.remove(), 180); }, 2800);
};
const statusClass = (status) => status === '已发布' ? 'green' : ['待审提报','待审脚本','待审样片','待审样品'].includes(status) ? 'amber' : status === '待回复邮件' ? 'red' : ['待发布','待收脚本','待收样片'].includes(status) ? 'blue' : '';
const badge = (status) => `<span class="status ${statusClass(status)}">${esc(status)}</span>`;
const channel = (name) => `<span class="channel"><span class="channel-dot ${esc((name || '').toLowerCase())}"></span>${esc(name || '—')}</span>`;
const avatar = (name = '朴银英', cls = 'person-avatar') => `<span class="${cls}">${esc(name.slice(0,1))}</span>`;
const selectOptions = (values, selected = '', first = '请选择') => `<option value="">${first}</option>${values.map((v) => `<option value="${esc(v)}" ${v === selected ? 'selected' : ''}>${esc(v)}</option>`).join('')}`;

function refreshReservations() {
  let changed = false;
  for (const creator of state.creators) {
    if (creator.state === '已入库' && creator.reserveUntil && new Date(creator.reserveUntil).getTime() <= Date.now() && !creator.emailSentAt) {
      creator.state = '公共池'; creator.owner = null; creator.group = ''; creator.reserveUntil = null;
      addCreatorLog(creator, '入库满 7 天未发送邮件，系统自动释放', '系统'); changed = true;
    }
  }
  if (changed) save();
}

function render() {
  refreshReservations();
  const todoCounts = [
    ['待回复邮件', state.orders.filter((o) => o.owner === state.activeUser && o.status === '待回复邮件').length, 'send'],
    ['待审提报', state.orders.filter((o) => o.owner === state.activeUser && o.status === '待审提报').length, 'file'],
    ['待查看脚本', state.orders.filter((o) => o.owner === state.activeUser && o.status === '待审脚本').length, 'file'],
    ['待审样片', state.orders.filter((o) => o.owner === state.activeUser && o.status === '待审样片').length, 'star'],
    ['待发布', state.orders.filter((o) => o.owner === state.activeUser && o.status === '待发布').length, 'external']
  ];
  const pending = todoCounts.reduce((sum, item) => sum + item[1], 0);
  root.innerHTML = `<div class="shell">
    <aside class="sidebar">
      <div class="brand"><div class="brand-mark">in</div><div><div class="brand-name">infruite</div><div class="brand-sub">CREATOR OPERATIONS</div></div></div>
      <div class="nav-label">工作空间</div>
      <nav class="nav-list">
        ${[['dashboard','grid','工作台'],['orders','box','订单管理'],['creators','users','达人管理'],['permissions','shield','权限管理']].map(([key,ico,label]) => `<button class="nav-item ${state.activePage===key?'active':''}" data-nav="${key}">${icon(ico)}<span>${label}</span>${key==='dashboard'&&pending?`<span class="nav-count">${pending}</span>`:''}</button>`).join('')}
      </nav>
      <div class="sidebar-bottom"><div class="workspace-card"><div class="workspace-kicker">当前工作空间 · 演示数据</div><div class="workspace-line"><span class="workspace-dot"></span>Creator Partnerships</div></div><div class="nav-label">WORKSPACE · 01</div></div>
    </aside>
    <main class="main">
      <header class="topbar"><div class="crumb">Infruite <span style="padding:0 5px;color:#c3c5c9">/</span> ${state.activePage==='dashboard'?'工作台':state.activePage==='orders'?'订单管理':state.activePage==='creators'?'达人管理':'权限管理'}</div>
        <div class="top-right"><button class="icon-button" title="通知">${icon('bell')}<span class="bell-dot"></span></button><div class="user-chip">${avatar(state.activeUser,'avatar')}<div class="user-meta"><div class="user-name">${esc(state.activeUser)}</div><div class="user-role">${esc(state.activeRole)}</div></div><span class="user-caret">${icon('down')}</span><select class="user-select" id="user-role-switch" aria-label="切换演示身份" title="切换演示身份">${state.permissions.filter((u)=>u.active).map((u)=>`<option value="${esc(u.name)}|${esc(u.role)}" ${u.name===state.activeUser&&u.role===state.activeRole?'selected':''}>${esc(u.name)} · ${esc(u.role)}</option>`).join('')}</select></div></div>
      </header>
      ${state.activePage==='dashboard'?renderDashboard(todoCounts,pending):state.activePage==='orders'?renderOrders():state.activePage==='creators'?renderCreators():renderPermissions()}
    </main>
  </div>`;
  renderDrawer();
}

function renderScaleOverview() {
  const people=state.permissions.filter((p)=>p.active);
  const admins=people.filter((p)=>p.role==='管理员').length;
  const leads=people.filter((p)=>p.role==='组长').length;
  const members=people.filter((p)=>p.role==='组员').length;
  const groups=new Set(people.map((p)=>p.group).filter(Boolean)).size;
  const total=Math.max(1,people.length);
  return `<section class="scale-overview"><div class="scale-head"><div><div class="scale-title">运营规模总览</div><div class="scale-subtitle">用完整体量展示团队协作与业务流转</div></div><span class="scale-badge">${icon('grid')} DEMO SCALE · 20×</span></div>
    <div class="scale-grid">
      <article class="scale-card"><div class="scale-card-head"><span class="scale-icon">${icon('users')}</span><span class="scale-label">运营人员</span></div><div class="scale-number">${people.length}<small>人</small></div><div class="scale-foot">${admins} 位管理员 · ${leads} 位组长 · ${members} 位组员</div></article>
      <article class="scale-card"><div class="scale-card-head"><span class="scale-icon violet">${icon('grid')}</span><span class="scale-label">运营小组</span></div><div class="scale-number">${groups}<small>组</small></div><div class="scale-foot">跨渠道分工 · 组内协作</div></article>
      <article class="scale-card"><div class="scale-card-head"><span class="scale-icon blue">${icon('box')}</span><span class="scale-label">合作订单</span></div><div class="scale-number">${state.orders.length}<small>单</small></div><div class="scale-foot">${state.orders.filter((o)=>o.status==='已发布').length} 单已发布 · ${state.orders.filter((o)=>o.status!=='已发布').length} 单进行中</div></article>
      <article class="scale-card"><div class="scale-card-head"><span class="scale-icon amber">${icon('star')}</span><span class="scale-label">达人档案</span></div><div class="scale-number">${state.creators.filter((c)=>!c.deleted).length}<small>位</small></div><div class="scale-foot">${state.creators.filter((c)=>c.state==='公共池').length} 位公共池 · ${state.creators.filter((c)=>c.state==='已触达').length} 位已触达</div></article>
    </div>
    <div class="staff-mix"><div class="staff-mix-head"><span>人员配比</span><span>${people.length} 人</span></div><div class="staff-mix-bar"><i class="mix-admin" style="width:${admins/total*100}%"></i><i class="mix-lead" style="width:${leads/total*100}%"></i><i class="mix-member" style="width:${members/total*100}%"></i></div><div class="staff-mix-legend"><span><i class="legend-dot admin"></i>管理员 <b>${admins}</b></span><span><i class="legend-dot lead"></i>组长 <b>${leads}</b></span><span><i class="legend-dot member"></i>组员 <b>${members}</b></span></div></div>
  </section>`;
}

function renderDashboard(todoCounts, pending) {
  const actions = state.orders.filter((o) => o.owner === state.activeUser && STATUS_PHASE[o.status] < 3).sort((a,b) => b.days-a.days).slice(0,4);
  const ownOrders = state.orders.filter((o) => o.owner === state.activeUser);
  const published = ownOrders.filter((o) => o.status === '已发布').length;
  return `<div class="page-head"><div><div class="eyebrow">YOUR DAILY OVERVIEW</div><h1>早上好，${esc(state.activeUser)}。</h1><div class="head-sub">先清空待办，再开始今天的新合作。</div></div><div class="date-label">${dateLong()}</div></div>
    <div class="dash-grid"><section class="card welcome-card"><div class="welcome-content"><div class="welcome-title">今天的工作，从这里<span>开始。</span></div><div class="welcome-copy">所有合作都在一张订单里，进度和下一步一目了然。</div><div class="focus-row"><div class="focus-avatar-stack">${OPERATOR_NAMES.slice(0,4).map((x)=>`<span class="focus-avatar">${x.slice(0,1)}</span>`).join('')}</div><div class="focus-caption">我的待办中有 <strong>${pending} 项需要处理</strong></div></div><div style="margin-top:19px"><button class="btn btn-primary btn-small" data-nav="orders">查看我的订单 ${icon('arrow')}</button></div></div></section>
    <section class="card daily-card"><div><div class="daily-label">我的已发布订单</div><div class="daily-number">${published}<span style="font-size:15px;color:#9a9da4;font-weight:500"> / ${ownOrders.length}</span></div></div><div class="daily-foot"><span>订单持续向前</span><span class="trend">${published?`↑ ${Math.round(published/Math.max(1,ownOrders.length)*100)}% 完成`:'稳步推进'}</span></div></section></div>
    ${renderScaleOverview()}
    <div class="section-heading"><h2>我的待办</h2><span class="section-meta">点击卡片，直接处理对应订单</span></div>
    <div class="task-grid">${todoCounts.map(([label,count,ico])=>`<button class="task-card" data-task-status="${label}"><div class="task-top"><span class="task-icon">${icon(ico)}</span>${icon('arrow')}</div><div class="task-count">${count}<span class="task-go">→</span></div><div class="task-title">${label}</div></button>`).join('')}</div>
    <div class="lower-grid"><section class="card panel"><div class="panel-title-row"><div class="panel-title">需要关注</div><button class="text-button" data-nav="orders">查看全部 →</button></div><div class="todo-list">${actions.length?actions.map((o)=>`<div class="todo-item"><span class="todo-dot" style="${o.days>5?'background:#d99a4a':''}"></span><div class="todo-copy"><div class="todo-main">${esc(o.influencer)} · ${esc(o.category)}</div><div class="todo-sub">${esc(o.id)}　${esc(o.status)} · 停留 ${o.days} 天</div></div><span class="todo-tag">${esc(o.owner)}</span></div>`).join(''):'<div class="empty-state">暂无需要关注的订单</div>'}</div></section>
    <section class="card panel"><div class="panel-title-row"><div class="panel-title">订单阶段分布</div><span class="section-meta">全部订单</span></div><div class="progress-block">${[['报价与合作',0],['脚本',1],['样片',2],['发布',3]].map(([name,phase])=>{const count=state.orders.filter((o)=>STATUS_PHASE[o.status]===phase).length;return `<div><div class="progress-line-head"><span>${name}</span><b>${count} 单</b></div><div class="progress-track"><div class="progress-bar" style="width:${Math.max(8,count/state.orders.length*100)}%"></div></div></div>`}).join('')}</div></section></div>`;
}

function renderOrders() {
  const f = state.orderFilters || {};
  const selected = visibleOrders().filter((o) => {
    const amount=Number(o.price)||0;
    return (!f.ids||f.ids.includes(o.id))&&(!f.id||o.id.includes(f.id))&&(!f.name||`${o.influencer} ${o.handle}`.toLowerCase().includes(f.name.toLowerCase()))&&(!f.region||o.region.includes(f.region))&&(!f.min||amount>=Number(f.min))&&(!f.max||amount<=Number(f.max))&&(!f.channel||o.channel===f.channel)&&(!f.status||o.status===f.status)&&(!f.owner||o.owner===f.owner)&&(!f.group||o.group===f.group)&&(!f.category||o.category===f.category)&&(!f.maxDays||o.days>=Number(f.maxDays))&&(!f.date||o.created.slice(0,10)===f.date);
  });
  const orderPages=Math.max(1,Math.ceil(selected.length/20));
  state.ordersPage=Math.min(Math.max(1,state.ordersPage||1),orderPages);
  const orderRows=selected.slice((state.ordersPage-1)*20,state.ordersPage*20);
  const input=(label,key,type='text',placeholder='',options=null)=>`<div class="field"><label>${label}</label>${options?`<select name="${key}">${selectOptions(options,f[key]||'')}</select>`:`<input name="${key}" type="${type}" value="${esc(f[key]||'')}" placeholder="${placeholder}" />`}</div>`;
  return `<div class="page-head"><div><div class="eyebrow">PARTNERSHIP PIPELINE</div><h1>订单管理</h1><div class="head-sub">每一次合作，都有清晰的负责人、进度和记录。</div></div><button class="btn btn-primary" data-action="new-order">${icon('plus')} 新建订单</button></div>
    <form class="card filter-card" id="order-filters"><div class="filter-grid">
      ${input('订单 ID','id','text','输入 12 位订单号')}${input('达人昵称','name','text','昵称或账号')}${input('达人地域','region','text','国家 / 地区')}
      ${input('最低金额（USD）','min','number','$ 最低')}${input('最高金额（USD）','max','number','$ 最高')}
      ${input('订单渠道','channel','text','',isAdmin()?CHANNELS:(currentPermission().channels||[]))}${input('订单状态','status','text','',STATUSES)}${input('归属运营','owner','text','',[...new Set(visibleOrders().map((o)=>o.owner))])}${input('运营组','group','text','',[...new Set(visibleOrders().map((o)=>o.group))])}${input('达人类别','category','text','',CATEGORIES)}
      ${input('创建日期','date','date')}${input('当前阶段停留 ≥ 天','maxDays','number','例如 5')}
    </div><div class="filter-actions"><span class="filter-summary">支持组合筛选，可同时选择多个条件</span><div class="filter-buttons"><button class="btn btn-small" type="button" data-action="clear-order-filters">重置</button><button class="btn btn-primary btn-small" type="submit">${icon('filter')} 应用筛选</button></div></div></form>
    <section class="card table-card"><div class="table-top"><div class="table-top-left"><span class="table-title">合作订单</span><span class="table-count">${selected.length} 条结果</span></div><div class="table-tools"><span class="status-legend"><span class="hint">点击一行查看订单详情</span></span><button class="btn btn-small" data-action="export-orders">${icon('download')} 导出</button></div></div>${selected.length?orderTable(orderRows,selected.length,state.ordersPage):emptyState('没有找到符合条件的订单','试试调整筛选条件，或创建一条新订单。')}</section>`;
}

function pageControls(listKey,page,total) {
  const pages=Math.max(1,Math.ceil(total/20));
  const start=Math.max(1,Math.min(page-2,pages-4));
  const end=Math.min(pages,start+4);
  return `<button data-list-page="${listKey}" data-page="${Math.max(1,page-1)}" ${page===1?'disabled':''} aria-label="上一页">‹</button>${Array.from({length:end-start+1},(_,i)=>start+i).map((n)=>`<button data-list-page="${listKey}" data-page="${n}" class="${n===page?'active':''}">${n}</button>`).join('')}<button data-list-page="${listKey}" data-page="${Math.min(pages,page+1)}" ${page===pages?'disabled':''} aria-label="下一页">›</button>`;
}

function orderTable(orders,total,page) {
  const first=(page-1)*20+1,last=Math.min(page*20,total);
  return `<div class="table-wrap"><table><thead><tr><th>达人 / 订单 ID</th><th>渠道</th><th>合作金额</th><th>当前状态</th><th>归属运营</th><th>阶段停留</th><th>创建日期</th><th>达人类别</th></tr></thead><tbody>${orders.map((o)=>`<tr class="data-row" data-order="${o.id}"><td><div class="name-cell">${avatar(o.influencer)}<div><div class="name-main">${esc(o.influencer)}</div><div class="name-sub">${esc(o.id)} · ${esc(o.handle)}</div></div></div></td><td>${channel(o.channel)}</td><td class="money">${money(o.price)}</td><td>${badge(o.status)}</td><td>${esc(o.owner)}<div class="name-sub">${esc(o.group)}</div></td><td style="color:${o.days>5?'#b47d30':'#8e929a'}">${o.days} 天</td><td>${dt(o.created)}</td><td>${esc(o.category)}</td></tr>`).join('')}</tbody></table></div><div class="table-foot"><span>显示 ${first}–${last} 条，共 ${total} 条订单</span><div class="page-selector">${pageControls('orders',page,total)}</div></div>`;
}

function renderCreators() {
  const f=state.creatorFilters||{};
  const list=visibleCreators().filter((c)=>!c.deleted&&(!f.id||c.id.includes(f.id))&&(!f.name||`${c.name} ${c.handle}`.toLowerCase().includes(f.name.toLowerCase()))&&(!f.region||c.region.toLowerCase().includes(f.region.toLowerCase()))&&(!f.channel||c.channels.includes(f.channel))&&(!f.category||c.category===f.category)&&(!f.owner||c.owner===f.owner)&&(!f.group||c.group===f.group)&&(!f.submitter||c.submitter===f.submitter)&&(!f.state||c.state===f.state)&&(!f.language||c.language.toLowerCase().includes(f.language.toLowerCase()))&&(!f.minPrice||(Number(c.price)||0)>=Number(f.minPrice))&&(!f.maxPrice||(Number(c.price)||0)<=Number(f.maxPrice))&&(!f.submittedAfter||c.submitted.slice(0,10)>=f.submittedAfter)&&(!f.submittedBefore||c.submitted.slice(0,10)<=f.submittedBefore)&&(!f.cooperated||((f.cooperated==='是')===state.orders.some((o)=>o.handle===c.handle||o.influencer===c.name))));
  const input=(label,key,options,type='text',placeholder='输入关键词')=>`<div class="field"><label>${label}</label>${options?`<select name="${key}">${selectOptions(options,f[key]||'')}</select>`:`<input type="${type}" name="${key}" value="${esc(f[key]||'')}" placeholder="${placeholder}" />`}</div>`;
  const selected=state.selectedCreators.filter((id)=>list.some((c)=>c.id===id));
  const creatorPages=Math.max(1,Math.ceil(list.length/20));
  state.creatorsPage=Math.min(Math.max(1,state.creatorsPage||1),creatorPages);
  const creatorRows=list.slice((state.creatorsPage-1)*20,state.creatorsPage*20);
  return `<div class="page-head"><div><div class="eyebrow">CREATOR DIRECTORY</div><h1>达人管理</h1><div class="head-sub">先锁定达人，再联系合作。每个渠道账号都能找到唯一归属。</div></div><div class="creator-toolbar"><button class="btn" data-action="download-template">${icon('download')} 下载模板</button><button class="btn" data-action="upload-creators">${icon('upload')} 批量提报</button><button class="btn btn-primary" data-action="bulk-email" ${selected.length?'':'disabled'}>${icon('send')} 标记已发邮件${selected.length?` · ${selected.length}`:''}</button></div><input class="file-input" id="creator-upload" type="file" accept=".csv,text/csv" /></div>
    <form class="card filter-card" id="creator-filters"><div class="filter-grid">${input('达人 ID','id')}${input('达人昵称','name')}${input('达人地域','region')}${input('达人渠道','channel',isAdmin()?CHANNELS:(currentPermission().channels||[]))}${input('最低合作价（USD）','minPrice',null,'number','$ 最低')}${input('最高合作价（USD）','maxPrice',null,'number','$ 最高')}${input('提报日期起','submittedAfter',null,'date','')}${input('提报日期至','submittedBefore',null,'date','')}${input('提报运营','submitter',[...new Set(visibleCreators().map((c)=>c.submitter).filter(Boolean))])}${input('归属运营','owner',[...new Set(visibleCreators().map((c)=>c.owner).filter(Boolean))])}${input('归属运营组','group',[...new Set(visibleCreators().map((c)=>c.group).filter(Boolean))])}${input('是否合作过','cooperated',['是','否'])}${input('语种','language')}${input('达人类别','category',CATEGORIES)}${input('达人状态','state',['公共池','已入库','已触达'])}</div><div class="filter-actions"><span class="filter-summary">${selected.length?`已选择 ${selected.length} 位达人`: '公共池可入库；7 天内未联系会自动释放'}</span><div class="filter-buttons"><button class="btn btn-small" type="button" data-action="clear-creator-filters">重置</button><button class="btn btn-primary btn-small" type="submit">${icon('filter')} 应用筛选</button></div></div></form>
    <section class="card table-card"><div class="table-top"><div class="table-top-left"><span class="table-title">达人名单</span><span class="table-count">${list.length} 位达人</span></div><div class="creator-toolbar">${isAdmin()?`<button class="btn btn-small" data-action="merge-creators" ${selected.length>1?'':'disabled'}>${icon('merge')} 合并</button>`:''}<span class="tag blue">公共池 ${visibleCreators().filter((c)=>!c.deleted&&c.state==='公共池').length}</span><span class="tag amber">已入库 ${visibleCreators().filter((c)=>!c.deleted&&c.state==='已入库').length}</span></div></div>${list.length?creatorTable(creatorRows,list.length,state.creatorsPage):emptyState('还没有符合条件的达人','上传达人名单，或调整筛选条件。')}</section>
    ${state.lastUploadReport?`<div class="card panel top-space"><div class="panel-title-row"><div class="panel-title">最近一次批量提报</div><button class="text-button" data-action="dismiss-upload-report">收起</button></div><div class="pill-row"><span class="tag green">成功 ${state.lastUploadReport.success.length} 人</span><span class="tag ${state.lastUploadReport.failed.length?'amber':''}">失败 ${state.lastUploadReport.failed.length} 人</span></div>${state.lastUploadReport.failed.length?`<div class="todo-list top-space">${state.lastUploadReport.failed.map((f)=>`<div class="todo-item"><span class="todo-dot" style="background:#d58c61"></span><div class="todo-copy"><div class="todo-main">${esc(f.row)}</div><div class="todo-sub">${esc(f.reason)}</div></div></div>`).join('')}</div>`:''}</div>`:''}`;
}

function creatorTable(list,total,page) {
  const first=(page-1)*20+1,last=Math.min(page*20,total);
  return `<div class="table-wrap"><table style="min-width:1080px"><thead><tr><th><input class="check" type="checkbox" data-action="select-all-creators" aria-label="全选本页" /></th><th>达人 / ID</th><th>渠道</th><th>地域 · 语种</th><th>上次合作价</th><th>提报 / 运营</th><th>归属 / 状态</th><th>类别</th><th>操作</th></tr></thead><tbody>${list.map((c)=>`<tr class="data-row" data-creator="${c.id}"><td><input class="check" type="checkbox" data-creator-check="${c.id}" ${state.selectedCreators.includes(c.id)?'checked':''} /></td><td><div class="name-cell">${avatar(c.name)}<div><div class="name-main">${esc(c.name)}</div><div class="name-sub">${esc(c.id)} · ${esc(c.handle)}</div></div></div></td><td><div class="pill-row">${c.channels.map((ch)=>`<span class="tag">${esc(ch)}</span>`).join('')}</div></td><td>${esc(c.region)}<div class="name-sub">${esc(c.language)}</div></td><td>${money(c.price)}</td><td>${dt(c.submitted)}<div class="name-sub">提报：${esc(c.submitter)}</div></td><td>${c.state==='公共池'?'<span class="tag green">公共池 · 可入库</span>':c.state==='已入库'?`<span class="tag amber">已入库 · ${esc(c.owner)}</span><div class="name-sub">${c.reserveUntil?`剩余 ${Math.max(0,Math.ceil((new Date(c.reserveUntil)-Date.now())/86400000))} 天`:'7 天保护期'}</div>`:`<span class="tag blue">已触达 · ${esc(c.owner)}</span>`}</td><td>${esc(c.category)}</td><td><div class="creator-actions">${creatorAction(c)}<button class="btn btn-small" data-action="creator-detail" data-id="${c.id}">详情</button></div></td></tr>`).join('')}</tbody></table></div><div class="table-foot"><span>显示 ${first}–${last} 位，共 ${total} 位达人</span><div class="page-selector">${pageControls('creators',page,total)}</div></div>`;
}
function creatorAction(c) {
  if (isAdmin()) return `<button class="btn btn-small" data-action="creator-assign" data-id="${c.id}">分配</button>`;
  if (c.state==='公共池') return `<button class="btn btn-soft btn-small" data-action="reserve-creator" data-id="${c.id}">入库</button>`;
  if (c.state==='已入库'&&c.owner===state.activeUser) return `<button class="btn btn-small" data-action="release-creator" data-id="${c.id}">释放</button>`;
  return `<button class="btn btn-small" disabled>已被占用</button>`;
}

function renderPermissions() {
  const requestForm=`<section class="card permission-card"><div class="panel-title-row"><div class="panel-title">申请操作权限</div><span class="tag">运营申请</span></div><div class="section-banner">选择你要负责的渠道和角色，提交后由管理员审核。管理员权限可以管理团队成员、达人归属与资料。</div><form id="request-permission"><div class="field"><label>操作运营</label><input name="name" value="${esc(state.activeUser)}" required /></div><div class="field top-space"><label>操作渠道</label><div class="inline-checks">${CHANNELS.map((c)=>`<label class="check-chip"><input class="check" type="checkbox" name="channels" value="${c}" />${c}</label>`).join('')}</div></div><div class="field top-space"><label>申请角色</label><select name="role">${selectOptions(['组员','组长','管理员'])}</select></div><button class="btn btn-primary top-space" type="submit">提交申请 ${icon('arrow')}</button></form><hr class="soft-divider"/><div class="request-box"><div class="request-box-title">权限说明</div><div class="request-box-copy">组员：操作自己负责的渠道订单和已入库达人。<br>组长：查看所辖小组的订单，并协助分配工作。<br>管理员：管理全渠道权限、达人归属，以及合并、拆分和删除达人。</div></div></section>`;
  return `<div class="page-head"><div><div class="eyebrow">TEAM ACCESS</div><h1>权限管理</h1><div class="head-sub">让每位运营只看到自己可以负责的渠道和工作。</div></div>${isAdmin()?`<button class="btn btn-primary" data-action="show-grant-form">${icon('plus')} 添加运营</button>`:''}</div>
    ${isAdmin()?`<div class="permission-grid"><section class="card permission-card"><div class="panel-title-row"><div class="panel-title">团队成员</div><span class="table-count">${state.permissions.filter((u)=>u.active).length} 位已授权</span></div><div class="permission-list">${state.permissions.filter((u)=>u.active).map((u)=>`<div class="permission-item">${`<div class="permission-person">${avatar(u.name,'avatar')}<div><div class="permission-person-main">${esc(u.name)}</div><div class="permission-person-sub">${esc(u.email)} · ${esc(u.group)}</div></div></div>`}<div class="scope-text">${u.channels.map((c)=>esc(c)).join('、')}</div><span class="role-badge ${u.role==='管理员'?'admin':''}">${esc(u.role)}</span></div>`).join('')}</div>${state.requests.length?`<div class="section-heading"><h2>待审批申请</h2><span class="section-meta">${state.requests.length} 项</span></div><div class="permission-list">${state.requests.map((r,i)=>`<div class="permission-item"><div class="permission-person">${avatar(r.name,'avatar')}<div><div class="permission-person-main">${esc(r.name)} 申请成为${esc(r.role)}</div><div class="permission-person-sub">${r.channels.map(esc).join('、')}</div></div></div><span class="scope-text">待审批</span><button class="btn btn-soft btn-small" data-action="approve-request" data-index="${i}">通过</button></div>`).join('')}</div>`:''}</section>${requestForm}</div>${renderGrantForm()}`:`<div class="permission-grid"><section class="card permission-card"><div class="panel-title-row"><div class="panel-title">我的权限</div><span class="role-badge">${esc(state.activeRole)}</span></div><div class="request-box"><div class="request-box-title">可操作渠道</div><div class="pill-row">${(currentPermission().channels||[]).map((c)=>`<span class="tag blue">${esc(c)}</span>`).join('')}</div><div class="field-foot top-space">权限由管理员按渠道和角色分配。</div></div>${state.requests.length?`<hr class="soft-divider"/><div class="request-box-title">我的申请</div><div class="todo-list">${state.requests.filter((r)=>r.name===state.activeUser).map((r)=>`<div class="todo-item"><span class="todo-dot"></span><div class="todo-copy"><div class="todo-main">${esc(r.role)} · ${r.channels.map(esc).join('、')}</div><div class="todo-sub">等待管理员审批</div></div></div>`).join('')||'<div class="hint">暂无申请记录</div>'}</div>`:''}</section>${requestForm}</div>`}`;
}

function renderGrantForm() {
  return `<form id="grant-permission" class="card permission-card top-space" style="display:none"><div class="panel-title-row"><div class="panel-title">新增操作运营</div><button type="button" class="text-button" data-action="hide-grant-form">收起</button></div><div class="form-row"><div class="field"><label>操作运营</label><input name="name" placeholder="姓名" required /></div><div class="field"><label>邮箱</label><input name="email" type="email" placeholder="name@company.com" /></div><div class="field"><label>归属运营组</label><select name="group">${selectOptions(GROUPS)}</select></div><div class="field"><label>角色</label><select name="role">${selectOptions(['组员','组长','管理员'])}</select></div></div><div class="field top-space"><label>可操作渠道</label><div class="inline-checks">${CHANNELS.map((c)=>`<label class="check-chip"><input class="check" type="checkbox" name="channels" value="${c}" />${c}</label>`).join('')}</div></div><button class="btn btn-primary top-space" type="submit">确认授权</button></form>`;
}

function emptyState(title, copy) { return `<div class="empty-state"><div class="empty-mark">${icon('search')}</div><strong style="display:block;color:#676b73;font-weight:600;margin-bottom:5px">${esc(title)}</strong>${esc(copy)}</div>`; }

function renderDrawer() {
  if (!state.drawer) { overlayRoot.innerHTML=''; return; }
  const d=state.drawer;
  if (d.type==='order') overlayRoot.innerHTML=renderOrderDrawer(d.id);
  else if (d.type==='history') overlayRoot.innerHTML=renderHistoryDrawer(d.id);
  else if (d.type==='creator') overlayRoot.innerHTML=renderCreatorDrawer(d.id);
  else if (d.type==='new-order') overlayRoot.innerHTML=renderNewOrderDrawer();
  else if (d.type==='assign') overlayRoot.innerHTML=renderAssignDrawer(d.id);
  else if (d.type==='split') overlayRoot.innerHTML=renderSplitDrawer(d.id);
  else if (d.type==='upload-report') overlayRoot.innerHTML=renderUploadReportDrawer();
}

function renderOrderDrawer(id) {
  const o=state.orders.find((item)=>item.id===id); if(!o) return '';
  const currentPhase=STATUS_PHASE[o.status]??0; const tab=state.drawer.tab||currentPhase;
  const options=STATUSES.filter((s)=>STATUS_RANK[s]<=(STATUS_RANK[o.status]||0));
  let content='';
  if(tab===0) content=`<div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">合作报价</div><span class="detail-section-note">价格以美元计价 · 更新后保存</span></div><div class="detail-grid"><div class="field"><label>合作渠道</label><select data-order-field="channel" data-order-id="${o.id}">${selectOptions(CHANNELS,o.channel)}</select></div><div class="field"><label>合作形式</label><select data-order-field="format" data-order-id="${o.id}">${selectOptions((o.channel==='YouTube'?['Dedicated','Integrated','Shorts']:o.channel==='Instagram'?['Reels','Carousel']:o.channel==='TikTok'?['Video']:o.channel==='X'?['Post','Article']:['Sponsorship','Article']),o.format)}</select></div><div class="field"><label>合作价格（USD）</label><input data-order-field="price" data-order-id="${o.id}" type="number" value="${Number(o.price)||''}" placeholder="金额" /></div><div class="field"><label>Boosting 权益</label><select data-order-field="boosting" data-order-id="${o.id}">${selectOptions(BOOSTING,o.rights?.boosting||'无')}</select></div><div class="field"><label>Usage 权益</label><select data-order-field="usage" data-order-id="${o.id}">${selectOptions(USAGE,o.rights?.usage||'无')}</select></div><div class="field"><label>达人邮箱 / 联系方式</label><input data-order-field="email" data-order-id="${o.id}" value="${esc(o.email||'')}" placeholder="name@example.com" /></div><div class="field span-2"><label>寄送样品</label><label class="check-chip" style="width:max-content"><input class="check" type="checkbox" data-order-field="needsSample" data-order-id="${o.id}" ${o.needsSample?'checked':''} />本次合作需要寄送实物样品</label></div></div><div class="detail-actions"><span class="hint">${(STATUS_PHASE[o.status]||0)>0?'阶段已推进，保存报价不会改变订单进度':o.needsSample?'确认报价后进入待寄样':'报价确认后进入 brief 阶段'}</span><div class="detail-actions-right"><button class="btn btn-primary btn-small" data-action="save-price" data-id="${o.id}">${(STATUS_PHASE[o.status]||0)>0?'保存报价':'保存报价并确认合作'}</button></div></div></div>
    ${o.status==='待回复邮件'?`<div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">邮件跟进</div><span class="tag amber">待回复</span></div><div class="section-banner">在邮件或其他渠道收到达人回复后，记录回复并进入议价阶段。</div><button class="btn btn-primary btn-small" data-action="mark-email-replied" data-id="${o.id}">已收到回复 · 开始议价</button></div>`:''}
    ${o.status==='待寄样'?`<div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">样品寄送</div><span class="tag amber">等待寄样</span></div><div class="section-banner">记录寄样完成后，运营可核对达人收到的样品。</div><button class="btn btn-primary btn-small" data-action="mark-sample-sent" data-id="${o.id}">记录样品已寄出</button></div>`:''}
    ${o.status==='待审样品'?`<div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">样品确认</div><span class="tag amber">待运营确认</span></div><div class="section-banner">确认达人收到正确样品后，再发送合作 Brief。</div><button class="btn btn-primary btn-small" data-action="approve-product-sample" data-id="${o.id}">确认样品 · 进入 Brief 阶段</button></div>`:''}
    <div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">达人提报信息</div>${o.status==='待审提报'?'<span class="tag amber">等待审核</span>':''}</div><div class="detail-grid"><div class="field"><label>提报内容 / 合作背景</label><textarea data-order-field="proposal" data-order-id="${o.id}" placeholder="记录达人提报信息">${esc(o.proposal||'')}</textarea></div><div class="field"><label>内部备注</label><textarea data-order-field="internalNote" data-order-id="${o.id}" placeholder="仅团队可见">${esc(o.internalNote||'')}</textarea></div></div>${o.status==='待审提报'?`<div class="detail-actions"><span class="hint">审核通过后进入议价阶段</span><button class="btn btn-primary btn-small" data-action="approve-proposal" data-id="${o.id}">通过提报</button></div>`:''}</div>`;
  if(tab===1) content=`<div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">合作 Brief</div><span class="detail-section-note">支持纯文字、链接或粘贴完整文档</span></div><div class="field"><label>发给达人的 Brief</label><textarea style="min-height:128px" data-order-field="brief" data-order-id="${o.id}" placeholder="写下产品信息、内容方向、交付要求、禁用表达等">${esc(o.brief||'')}</textarea></div><div class="detail-actions"><span class="hint">${o.brief?'Brief 已保存，可重新发送':'未提交 Brief 时状态为「待发 brief」'}</span><button class="btn btn-primary btn-small" data-action="submit-brief" data-id="${o.id}">${o.brief?'确认已发送':'保存并标记已发送'} →</button></div></div>
    <div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">达人脚本</div><span class="detail-section-note">从邮件或 WhatsApp 收到后粘贴在这里</span></div><div class="field"><label>脚本内容或文件链接</label><textarea style="min-height:125px" data-order-field="script" data-order-id="${o.id}" placeholder="粘贴达人脚本、Google Docs 链接或版本说明">${esc(o.script||'')}</textarea></div><div class="detail-actions"><span class="hint">提交后运营可审核并通过</span><div class="detail-actions-right"><button class="btn btn-small" data-action="save-script" data-id="${o.id}">保存脚本</button>${o.status==='待审脚本'?`<button class="btn btn-primary btn-small" data-action="approve-script" data-id="${o.id}">审核通过 →</button>`:''}</div></div>${o.status==='待审脚本'?'<div class="review-box">审核提示：检查产品信息、品牌语气、必要卖点和平台合规要求。</div>':''}</div>`;
  if(tab===2) content=`<div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">达人样片</div><span class="detail-section-note">从邮件或 WhatsApp 收到后记录</span></div><div class="field"><label>样片链接 / 修改意见</label><textarea style="min-height:125px" data-order-field="sample" data-order-id="${o.id}" placeholder="粘贴视频预览链接，或记录样片版本与备注">${esc(o.sample||'')}</textarea></div><div class="detail-actions"><span class="hint">通过后订单进入发布阶段</span><div class="detail-actions-right"><button class="btn btn-small" data-action="save-sample" data-id="${o.id}">保存样片</button>${o.status==='待审样片'?`<button class="btn btn-primary btn-small" data-action="approve-sample" data-id="${o.id}">审核通过 →</button>`:''}</div></div>${o.status==='待审样片'?'<div class="review-box">审核提示：检查画面清晰度、口播信息、音乐版权、字幕与最终交付内容。</div>':''}</div>`;
  if(tab===3) content=`<div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">发布回填</div><span class="detail-section-note">合作权益已按报价预填</span></div><div class="section-banner">${esc(o.channel)} · ${esc(o.format)} · ${money(o.price)} USD　/　Boosting ${esc(o.rights?.boosting||'无')}　/　Usage ${esc(o.rights?.usage||'无')}</div><div class="detail-grid"><div class="field span-2"><label>发布内容链接</label><input data-order-field="postLink" data-order-id="${o.id}" value="${esc(o.postLink||'')}" placeholder="https://..." /></div><div class="field"><label>Ads Code</label><input data-order-field="adCode" data-order-id="${o.id}" value="${esc(o.adCode||'')}" placeholder="填写广告授权码" /></div><div class="field"><label>Usage 视频原片地址</label><input data-order-field="rawVideo" data-order-id="${o.id}" value="${esc(o.rawVideo||'')}" placeholder="Drive / Dropbox 链接" /></div><div class="field span-2"><label>内容标签（可多选）</label><div class="inline-checks">${['开箱','好物分享','利益点硬广'].map((tag)=>`<label class="check-chip"><input class="check" type="checkbox" data-order-label="${tag}" data-order-id="${o.id}" ${(o.labels||[]).includes(tag)?'checked':''} />${tag}</label>`).join('')}</div></div></div><div class="detail-actions"><span class="hint">完整填写后可完结订单</span><button class="btn btn-primary btn-small" data-action="complete-order" data-id="${o.id}">完结订单 ${icon('check')}</button></div></div>
    <div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">合作权益记录</div></div><div class="pill-row"><span class="tag">${esc(o.channel)} · ${esc(o.format)}</span><span class="tag">${money(o.price)} USD</span><span class="tag">Boosting · ${esc(o.rights?.boosting||'无')}</span><span class="tag">Usage · ${esc(o.rights?.usage||'无')}</span></div></div>`;
  return `<div class="modal-backdrop" data-action="backdrop"><section class="drawer"><header class="drawer-header"><div><div class="drawer-kicker">PARTNERSHIP ORDER · ${esc(o.id)}</div><div class="drawer-title">${esc(o.influencer)} ${badge(o.status)}</div><div class="drawer-sub">${channel(o.channel)}　${esc(o.region)}　·　归属 ${esc(o.owner)} / ${esc(o.group)}</div></div><button class="close-button" data-action="close-drawer">${icon('close')}</button></header><div class="drawer-body"><div class="detail-status-row"><div><div class="drawer-kicker" style="margin:0 0 6px">当前订单状态</div><select class="status-select" data-action="change-order-status" data-id="${o.id}">${options.map((s)=>`<option value="${s}" ${s===o.status?'selected':''}>${s}</option>`).join('')}</select></div><button class="btn btn-small" data-action="open-history" data-id="${o.id}">${icon('history')} 操作历史</button></div>
    <div class="stepper">${PHASES.map((p,i)=>`<div class="step ${i<currentPhase?'done':i===currentPhase?'current':''}"><div class="step-dot">${i<currentPhase?icon('check'):i+1}</div>${p}</div>`).join('')}</div><div class="detail-tabs">${PHASES.map((p,i)=>`<button class="detail-tab ${tab===i?'active':''}" data-action="order-tab" data-tab="${i}" ${i>currentPhase?'disabled title="尚未到达此阶段"':''}>${p}</button>`).join('')}</div>${content}<div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">订单摘要</div><span class="detail-section-note">创建于 ${dt(o.created)}</span></div><div class="detail-grid"><div><div class="hint">达人账号</div><div class="todo-main top-space">${esc(o.handle)}　·　${esc(o.email||'未填写邮箱')}</div></div><div><div class="hint">品类 / 当前停留</div><div class="todo-main top-space">${esc(o.category)}　·　${o.days} 天</div></div></div></div>
    <div class="detail-actions"><span class="hint">订单操作会记入操作历史</span><div class="detail-actions-right"><button class="btn btn-small" data-action="save-order-notes" data-id="${o.id}">保存当前内容</button></div></div></div></section></div>`;
}

function renderHistoryDrawer(id) {
  const o=state.orders.find((item)=>item.id===id); if(!o)return '';
  return `<div class="modal-backdrop" data-action="backdrop"><section class="drawer" style="width:min(490px,94vw)"><header class="drawer-header"><div><div class="drawer-kicker">ACTIVITY LOG</div><div class="drawer-title">操作历史</div><div class="drawer-sub">${esc(o.influencer)} · ${esc(o.id)}</div></div><button class="close-button" data-action="close-history">${icon('close')}</button></header><div class="drawer-body"><div class="log-list">${(o.log||[]).map(([who,what,when])=>`<div class="log-row">${avatar(who,'log-avatar')}<div class="log-text"><strong>${esc(who)}</strong> ${esc(what)}</div><span class="log-time">${dt(when,false)}<br>${dt(when)}</span></div>`).join('')||'<div class="empty-state">暂无操作记录</div>'}</div></div></section></div>`;
}

function renderNewOrderDrawer() {
  return `<div class="modal-backdrop" data-action="backdrop"><section class="drawer" style="width:min(560px,94vw)"><header class="drawer-header"><div><div class="drawer-kicker">NEW PARTNERSHIP</div><div class="drawer-title">创建合作订单</div><div class="drawer-sub">系统将自动生成 2 开头的 12 位订单号。</div></div><button class="close-button" data-action="close-drawer">${icon('close')}</button></header><div class="drawer-body"><form id="new-order-form"><div class="detail-grid"><div class="field"><label>达人昵称</label><input name="influencer" required placeholder="例如 Mia Chen" /></div><div class="field"><label>达人账号</label><input name="handle" placeholder="@creator" /></div><div class="field"><label>渠道</label><select name="channel">${selectOptions(isAdmin()?CHANNELS:(currentPermission().channels||[]))}</select></div><div class="field"><label>达人地域</label><input name="region" placeholder="国家 / 地区" /></div><div class="field"><label>达人类别</label><select name="category">${selectOptions(CATEGORIES)}</select></div><div class="field"><label>归属运营</label><select name="owner">${selectOptions(isAdmin()?state.permissions.filter((u)=>u.active).map((u)=>u.name):[state.activeUser],state.activeUser)}</select></div><div class="field"><label>归属运营组</label><select name="group">${selectOptions(isAdmin()?GROUPS:[currentPermission().group],currentPermission().group)}</select></div><div class="field"><label>提报状态</label><select name="status">${selectOptions(['待审提报','待回复邮件','待议价'],'待审提报')}</select></div><div class="field span-2"><label>提报说明</label><textarea name="proposal" placeholder="提报背景、主页链接或初步合作想法"></textarea></div></div><div class="detail-actions"><span class="hint">创建后可以在订单详情里补充报价</span><button class="btn btn-primary" type="submit">创建订单 ${icon('arrow')}</button></div></form></div></section></div>`;
}

function renderCreatorDrawer(id) {
  const c=state.creators.find((item)=>item.id===id); if(!c)return '';
  return `<div class="modal-backdrop" data-action="backdrop"><section class="drawer" style="width:min(610px,94vw)"><header class="drawer-header"><div><div class="drawer-kicker">CREATOR PROFILE · ${esc(c.id)}</div><div class="drawer-title">${esc(c.name)} <span class="tag">${esc(c.state)}</span></div><div class="drawer-sub">${esc(c.handle)}　·　${esc(c.region)}</div></div><button class="close-button" data-action="close-drawer">${icon('close')}</button></header><div class="drawer-body"><div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">达人资料</div><span class="detail-section-note">${c.channels.map(esc).join(' / ')}</span></div><div class="detail-grid"><div><div class="hint">达人类别 / 语种</div><div class="todo-main top-space">${esc(c.category)} · ${esc(c.language)}</div></div><div><div class="hint">上次合作价</div><div class="todo-main top-space">${money(c.price)}</div></div><div><div class="hint">提报信息</div><div class="todo-main top-space">${dt(c.submitted)} · ${esc(c.submitter)}</div></div><div><div class="hint">当前归属</div><div class="todo-main top-space">${esc(c.owner||'公共池')} ${c.group?`· ${esc(c.group)}`:''}</div></div><div class="span-2"><div class="hint">主页链接</div><div class="todo-list top-space">${(c.socials||[]).map((s)=>`<div class="todo-main"><a href="${esc(s)}" target="_blank" rel="noreferrer" style="color:var(--blue);text-decoration:none">${esc(s)} ${icon('external')}</a></div>`).join('')||'—'}</div></div><div class="field span-2"><label>邮箱</label><input data-creator-field="email" data-creator-id="${c.id}" value="${esc(c.email||'')}" placeholder="name@example.com" /></div></div><div class="detail-actions"><span class="hint">${c.state==='已入库'&&c.reserveUntil?`7 天保护期，${dt(c.reserveUntil)} 自动释放`:c.emailSentAt?`首次邮件已发送：${dt(c.emailSentAt)}`:'未联系'}</span><div class="detail-actions-right">${isAdmin()?`<button class="btn btn-small" data-action="split-creator" data-id="${c.id}" ${c.channels.length<2?'disabled':''}>${icon('split')} 拆分</button><button class="btn btn-danger btn-small" data-action="delete-creator" data-id="${c.id}">删除达人</button>`:''}</div></div></div><div class="detail-section"><div class="detail-section-head"><div class="detail-section-title">达人操作记录</div></div><div class="log-list">${(c.log||[]).map(([who,what,when])=>`<div class="log-row">${avatar(who,'log-avatar')}<div class="log-text"><strong>${esc(who)}</strong> ${esc(what)}</div><span class="log-time">${dt(when,false)}<br>${dt(when)}</span></div>`).join('')||'<div class="hint">暂无记录</div>'}</div></div></div></section></div>`;
}

function renderAssignDrawer(id) {
  const c=state.creators.find((x)=>x.id===id); if(!c)return '';
  return `<div class="modal-backdrop" data-action="backdrop"><section class="drawer" style="width:min(470px,94vw)"><header class="drawer-header"><div><div class="drawer-kicker">ADMINISTRATOR ACTION</div><div class="drawer-title">分配达人归属</div><div class="drawer-sub">${esc(c.name)} · ${esc(c.id)}</div></div><button class="close-button" data-action="close-drawer">${icon('close')}</button></header><div class="drawer-body"><form id="assign-creator-form" data-id="${c.id}"><div class="field"><label>归属运营</label><select name="owner">${selectOptions(state.permissions.filter((u)=>u.active).map((u)=>u.name),c.owner||'')}</select></div><div class="field top-space"><label>归属运营组</label><select name="group">${selectOptions(GROUPS,c.group||'')}</select></div><div class="section-banner top-space">管理员分配不受 7 天锁定限制。分配给运营后，其他运营不可入库。</div><button class="btn btn-primary top-space" type="submit">保存分配</button></form></div></section></div>`;
}

function renderSplitDrawer(id) {
  const c=state.creators.find((x)=>x.id===id); if(!c)return '';
  return `<div class="modal-backdrop" data-action="backdrop"><section class="drawer" style="width:min(470px,94vw)"><header class="drawer-header"><div><div class="drawer-kicker">ADMINISTRATOR ACTION</div><div class="drawer-title">拆分渠道账号</div><div class="drawer-sub">${esc(c.name)} 当前合并了 ${c.channels.map(esc).join('、')}</div></div><button class="close-button" data-action="close-drawer">${icon('close')}</button></header><div class="drawer-body"><form id="split-creator-form" data-id="${c.id}"><div class="field"><label>拆出的渠道</label><select name="channel">${selectOptions(c.channels)}</select></div><div class="section-banner top-space">会生成一个新的达人 ID，并将选中渠道单独拆出。原达人保留其他渠道。</div><button class="btn btn-primary top-space" type="submit">确认拆分</button></form></div></section></div>`;
}

function renderUploadReportDrawer() {
  const r=state.lastUploadReport||{success:[],failed:[]};
  return `<div class="modal-backdrop" data-action="backdrop"><section class="drawer" style="width:min(520px,94vw)"><header class="drawer-header"><div><div class="drawer-kicker">CREATOR IMPORT</div><div class="drawer-title">提报结果</div><div class="drawer-sub">成功 ${r.success.length} 人 · 失败 ${r.failed.length} 人</div></div><button class="close-button" data-action="close-drawer">${icon('close')}</button></header><div class="drawer-body"><div class="pill-row"><span class="tag green">成功 ${r.success.length} 人</span><span class="tag ${r.failed.length?'amber':''}">失败 ${r.failed.length} 人</span></div>${r.failed.length?`<div class="log-list top-space">${r.failed.map((x)=>`<div class="log-row"><span class="tag amber">失败</span><div class="log-text">${esc(x.row)}<br><span class="hint">${esc(x.reason)}</span></div></div>`).join('')}</div>`:'<div class="section-banner top-space">名单已全部入库，当前归属为你本人；7 天内未发送邮件会自动释放。</div>'}</div></section></div>`;
}

function readOrderFields(id) {
  const order=state.orders.find((o)=>o.id===id); if(!order)return null;
  document.querySelectorAll(`[data-order-id="${id}"][data-order-field]`).forEach((el)=>{
    const field=el.dataset.orderField;
    if(field==='boosting'||field==='usage'){order.rights ||= {};order.rights[field]=el.value;}
    else if(el.type==='checkbox')order[field]=el.checked;
    else if(field==='price')order[field]=Number(el.value)||0;
    else order[field]=el.value;
  });
  const labels=[...document.querySelectorAll(`[data-order-id="${id}"][data-order-label]:checked`)].map((el)=>el.dataset.orderLabel);
  if(document.querySelector(`[data-order-id="${id}"][data-order-label]`))order.labels=labels;
  return order;
}
function saveOrder(order, message) { if(message)addOrderLog(order,message); save(); }

function parseCsv(text) {
  const rows=[]; let row=[], cell='', quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i], next=text[i+1];
    if(ch==='"'&&quoted&&next==='"'){cell+='"';i++;}
    else if(ch==='"')quoted=!quoted;
    else if(ch===','&&!quoted){row.push(cell.trim());cell='';}
    else if((ch==='\n'||ch==='\r')&&!quoted){if(ch==='\r'&&next==='\n')i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell='';}
    else cell+=ch;
  }
  if(cell||row.length){row.push(cell.trim());if(row.some(Boolean))rows.push(row);}
  return rows;
}
const headerAliases={
  '昵称':['昵称','达人昵称','name','creator name'], '地域':['地域','达人地域','region','location'],
  '渠道':['渠道','达人渠道','channel','platform'], '主页链接':['主页链接','主页','链接','profile url','url'],
  '语种':['语种','语言','language'], '达人类别':['达人类别','类别','category'], '邮箱':['邮箱','email','e-mail'],
  '上次合作价':['上次合作价','合作价','价格','price'], '账号':['账号','达人账号','handle','username']
};
function importCreators(text) {
  const rows=parseCsv(text); const result={success:[],failed:[]};
  if(rows.length<2){state.lastUploadReport={success:[],failed:[{row:'文件内容',reason:'文件为空，或只有表头没有达人数据。'}]};openDrawer('upload-report');return;}
  const rawHeaders=rows[0].map((h)=>h.toLowerCase());
  const indexFor=(key)=>rawHeaders.findIndex((h)=>headerAliases[key].some((alias)=>alias.toLowerCase()===h));
  const indices=Object.fromEntries(Object.keys(headerAliases).map((k)=>[k,indexFor(k)]));
  const missing=['昵称','渠道'].filter((k)=>indices[k]<0);
  if(missing.length){state.lastUploadReport={success:[],failed:[{row:'表头',reason:`缺少必填列：${missing.join('、')}。请使用模板中的表头。`}]};openDrawer('upload-report');return;}
  rows.slice(1).forEach((cells,i)=>{
    const get=(key)=>indices[key]>=0?(cells[indices[key]]||'').trim():'';
    const label=`第 ${i+2} 行：${get('昵称')||'(未填写昵称)'}`;
    const name=get('昵称'), channelName=get('渠道');
    if(!name||!channelName){result.failed.push({row:label,reason:'昵称和渠道为必填项。'});return;}
    if(!CHANNELS.includes(channelName)){result.failed.push({row:label,reason:`渠道“${channelName}”不在支持范围内。`});return;}
    if(!isAdmin()&&!(currentPermission().channels||[]).includes(channelName)){result.failed.push({row:label,reason:`当前账号没有 ${channelName} 渠道的操作权限。`});return;}
    const key=(v)=>v.toLowerCase().replace(/^@/,'').trim();
    const handle=get('账号')||get('主页链接').split('/').filter(Boolean).pop()||name;
    const duplicate=state.creators.find((c)=>!c.deleted&&c.channels.includes(channelName)&&(key(c.handle)===key(handle)||c.name.toLowerCase()===name.toLowerCase()));
    if(duplicate){result.failed.push({row:label,reason:`名单重复：${duplicate.name}（${duplicate.id}）已有 ${channelName} 账号。`});return;}
    const url=get('主页链接');
    const creator={id:makeCreatorId(),name,handle:handle.startsWith('@')?handle:`@${handle}`,region:get('地域')||'待补充',channels:[channelName],price:Number(get('上次合作价').replace(/[$,]/g,''))||0,submitted:new Date().toISOString(),submitter:state.activeUser,owner:state.activeUser,group:currentPermission().group||'',language:get('语种')||'待确认',category:CATEGORIES.includes(get('达人类别'))?get('达人类别'):'日常生活',state:'已入库',reserveUntil:new Date(Date.now()+7*86400000).toISOString(),emailSentAt:null,email:get('邮箱'),socials:url?[url]:[],log:[]};
    addCreatorLog(creator,'通过批量提报入库');state.creators.unshift(creator);result.success.push({name,id:creator.id});
  });
  state.lastUploadReport=result;state.selectedCreators=[];state.creatorsPage=1;save();openDrawer('upload-report');render();
}

document.addEventListener('click',(event)=>{
  const listPage=event.target.closest('[data-list-page]');
  if(listPage){if(listPage.disabled)return;state[listPage.dataset.listPage==='orders'?'ordersPage':'creatorsPage']=Number(listPage.dataset.page)||1;render();return;}
  const nav=event.target.closest('[data-nav]');
  if(nav){state.activePage=nav.dataset.nav;state.drawer=null;save();render();return;}
  const task=event.target.closest('[data-task-status]');
  if(task){const status=task.dataset.taskStatus,filterStatus=status==='待查看脚本'?'待审脚本':status;const taskIds=state.orders.filter((o)=>o.owner===state.activeUser&&o.status===filterStatus).map((o)=>o.id);state.activePage='orders';state.ordersPage=1;state.orderFilters={status:filterStatus,owner:state.activeUser,ids:taskIds};save();render();return;}
  const orderRow=event.target.closest('[data-order]');
  if(orderRow){openDrawer('order',orderRow.dataset.order);return;}
  const creatorRow=event.target.closest('[data-creator]');
  if(creatorRow&&!event.target.closest('button,input,a')){openDrawer('creator',creatorRow.dataset.creator);return;}
  const el=event.target.closest('[data-action]');if(!el)return;
  const action=el.dataset.action,id=el.dataset.id;
  if(action==='close-drawer'){closeDrawer();return;}
  if(action==='backdrop'&&event.target===el){closeDrawer();return;}
  if(action==='order-tab'){state.drawer.tab=Number(el.dataset.tab);renderDrawer();return;}
  if(action==='open-history'){state.drawer={type:'history',id,tab:state.drawer?.tab||0};renderDrawer();return;}
  if(action==='close-history'){state.drawer={type:'order',id,tab:state.drawer?.tab||0};renderDrawer();return;}
  if(action==='new-order'){openDrawer('new-order');return;}
  if(action==='clear-order-filters'){state.orderFilters={};state.ordersPage=1;render();return;}
  if(action==='clear-creator-filters'){state.creatorFilters={};state.selectedCreators=[];state.creatorsPage=1;render();return;}
  if(action==='save-price'){
    const o=readOrderFields(id);if(!o)return;
    if(o.status==='待审提报'||o.status==='待回复邮件'){toast('请先处理提报或邮件，再确认合作价格。','error');return;}
    if(o.status==='待寄样'||o.status==='待审样品'){toast('请先完成样品寄送和确认。','error');return;}
    if(!o.price){toast('请先填写合作价格。','error');return;}
    const progressed=(STATUS_PHASE[o.status]||0)>0;
    if(!progressed){o.status=o.needsSample?'待寄样':'待发brief';o.days=0;saveOrder(o,`确认合作价格 ${money(o.price)}${o.needsSample?'，等待寄样':''}`);toast(o.needsSample?'报价已确认，进入待寄样阶段。':'报价已保存，订单进入 brief 阶段。');}
    else {saveOrder(o,`更新合作报价 ${money(o.price)}`);toast('报价已更新，订单阶段保持不变。');}
    render();return;
  }
  if(action==='approve-proposal'){const o=state.orders.find((x)=>x.id===id);if(o){o.status='待议价';o.days=0;saveOrder(o,'审核通过达人提报');toast('提报已通过，进入议价阶段。');render();}return;}
  if(action==='submit-brief'){const o=readOrderFields(id);if(o){if(!o.brief.trim()){toast('请先填写 Brief 内容。','error');return;}o.status='待收脚本';o.days=0;saveOrder(o,'Brief 已发送，等待达人脚本');toast('Brief 已记录，状态更新为待收脚本。');render();}return;}
  if(action==='save-script'){const o=readOrderFields(id);if(o){if(!o.script.trim()){toast('请先填写脚本内容或链接。','error');return;}o.status='待审脚本';o.days=0;saveOrder(o,'提交达人脚本，等待审核');toast('脚本已提交审核。');render();}return;}
  if(action==='approve-script'){const o=readOrderFields(id);if(o){o.status='待收样片';o.days=0;saveOrder(o,'脚本审核通过');toast('脚本已通过，等待达人样片。');render();}return;}
  if(action==='save-sample'){const o=readOrderFields(id);if(o){if(!o.sample.trim()){toast('请先填写样片链接或版本说明。','error');return;}o.status='待审样片';o.days=0;saveOrder(o,'提交达人样片，等待审核');toast('样片已提交审核。');render();}return;}
  if(action==='approve-sample'){const o=readOrderFields(id);if(o){o.status='待发布';o.days=0;saveOrder(o,'样片审核通过，订单进入发布阶段');toast('样片已通过，进入发布阶段。');render();}return;}
  if(action==='complete-order'){const o=readOrderFields(id);if(o){if(!o.postLink.trim()||(!o.adCode.trim()&&!o.rawVideo.trim())||!(o.labels||[]).length){toast('请填写发布链接、Ads Code 或原片地址，并选择内容标签。','error');return;}o.status='已发布';o.days=0;o.completedAt=new Date().toISOString();saveOrder(o,'订单已完结');toast('订单已完结。');render();}return;}
  if(action==='mark-email-replied'){const o=state.orders.find((x)=>x.id===id);if(o){o.status='待议价';o.days=0;saveOrder(o,'已回复达人邮件，进入议价阶段');toast('邮件已记录回复。');render();}return;}
  if(action==='mark-sample-sent'){const o=state.orders.find((x)=>x.id===id);if(o){o.status='待审样品';o.days=0;saveOrder(o,'记录样品已寄出，等待达人确认');toast('已记录样品寄出。');render();}return;}
  if(action==='approve-product-sample'){const o=state.orders.find((x)=>x.id===id);if(o){o.status='待发brief';o.days=0;saveOrder(o,'确认样品，准备发送 Brief');toast('样品已确认，可以发送 Brief。');render();}return;}
  if(action==='save-order-notes'){const o=readOrderFields(id);if(o){saveOrder(o,'保存订单信息');toast('订单内容已保存。');render();}return;}
  if(action==='creator-detail'){openDrawer('creator',id);return;}
  if(action==='reserve-creator'){
    const c=state.creators.find((x)=>x.id===id);if(!c||c.state!=='公共池'){toast('这位达人已被其他运营锁定。','error');return;}
    c.state='已入库';c.owner=state.activeUser;c.group=currentPermission().group||'';c.reserveUntil=new Date(Date.now()+7*86400000).toISOString();c.emailSentAt=null;addCreatorLog(c,'入库并锁定达人');state.selectedCreators=state.selectedCreators.filter((x)=>x!==id);save();toast('已入库，7 天内你拥有优先联系权。');render();return;
  }
  if(action==='release-creator'){
    const c=state.creators.find((x)=>x.id===id);if(c&&c.owner===state.activeUser&&c.state==='已入库'){c.state='公共池';c.owner=null;c.group='';c.reserveUntil=null;addCreatorLog(c,'主动释放达人');save();toast('达人已回到公共池。');render();}return;
  }
  if(action==='bulk-email'){
    const selected=state.creators.filter((c)=>state.selectedCreators.includes(c.id)&&c.state==='已入库'&&c.owner===state.activeUser);
    if(!selected.length){toast('请选择自己已入库的达人。','error');return;}
    const sentAt=new Date().toISOString();selected.forEach((c)=>{c.state='已触达';c.emailSentAt=sentAt;c.reserveUntil=null;addCreatorLog(c,'标记首次合作邮件已发送');});state.selectedCreators=[];save();toast(`已记录 ${selected.length} 位达人的首次邮件。`);render();return;
  }
  if(action==='download-template'){
    const csv='昵称,账号,地域,渠道,主页链接,语种,达人类别,邮箱,上次合作价\n';
    const link=document.createElement('a');link.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));link.download='infruite-达人提报模板.csv';link.click();URL.revokeObjectURL(link.href);toast('已下载达人提报模板。');return;
  }
  if(action==='upload-creators'){document.querySelector('#creator-upload')?.click();return;}
  if(action==='dismiss-upload-report'){state.lastUploadReport=null;save();render();return;}
  if(action==='creator-assign'){openDrawer('assign',id);return;}
  if(action==='merge-creators'){
    const items=state.creators.filter((c)=>state.selectedCreators.includes(c.id)&&!c.deleted);
    if(items.length<2){toast('请先选择两位或以上的达人。','error');return;}
    const channels=[...new Set(items.flatMap((c)=>c.channels))];
    const duplicateChannel=channels.length<items.reduce((sum,c)=>sum+c.channels.length,0);
    if(duplicateChannel){toast('所选达人中有重复渠道，请先检查名单。','error');return;}
    const first=items[0];first.channels=channels;first.socials=[...new Set(items.flatMap((c)=>c.socials||[]))];first.handle=items.map((c)=>c.handle).join(' / ');first.mergedFrom=items.slice(1).map((c)=>c.id);addCreatorLog(first,`管理员合并 ${items.length} 个达人档案`);state.creators=state.creators.filter((c)=>c.id===first.id||!items.some((x)=>x.id===c.id));state.selectedCreators=[];save();toast(`已合并为一个达人档案（${channels.join('、')}）。`);render();return;
  }
  if(action==='split-creator'){openDrawer('split',id);return;}
  if(action==='delete-creator'){
    if(!confirm('确定删除这位达人吗？此操作会从达人池移除该档案。'))return;
    state.creators=state.creators.filter((c)=>c.id!==id);state.selectedCreators=state.selectedCreators.filter((x)=>x!==id);save();toast('达人已删除。');render();return;
  }
  if(action==='show-grant-form'){const form=document.querySelector('#grant-permission');if(form)form.style.display='block';return;}
  if(action==='hide-grant-form'){const form=document.querySelector('#grant-permission');if(form)form.style.display='none';return;}
  if(action==='approve-request'){
    if(!isAdmin())return;const request=state.requests[Number(el.dataset.index)];if(!request)return;
    state.permissions.push({name:request.name,email:request.email||'',role:request.role,group:request.group||'朴银英组',channels:request.channels,managedGroups:request.role==='组长'?[request.group||'朴银英组']:request.role==='管理员'?[...GROUPS]:[],active:true});state.requests.splice(Number(el.dataset.index),1);save();toast(`已授权 ${request.name}。`);render();return;
  }
  if(action==='export-orders'){
    const keys=['id','influencer','handle','region','channel','price','status','owner','group','created','category','days'];const rows=state.orders.map((o)=>keys.map((k)=>`"${String(o[k]??'').replaceAll('"','""')}"`).join(','));
    const link=document.createElement('a');link.href=URL.createObjectURL(new Blob(['\ufeff'+[keys.join(','),...rows].join('\n')],{type:'text/csv;charset=utf-8'}));link.download='infruite-订单列表.csv';link.click();URL.revokeObjectURL(link.href);toast('订单列表已导出。');return;
  }
});

document.addEventListener('submit',(event)=>{
  if(event.target.id==='order-filters'){event.preventDefault();state.orderFilters=Object.fromEntries(new FormData(event.target).entries());Object.keys(state.orderFilters).forEach((k)=>{if(!state.orderFilters[k])delete state.orderFilters[k];});state.ordersPage=1;save();render();return;}
  if(event.target.id==='creator-filters'){event.preventDefault();state.creatorFilters=Object.fromEntries(new FormData(event.target).entries());Object.keys(state.creatorFilters).forEach((k)=>{if(!state.creatorFilters[k])delete state.creatorFilters[k];});state.creatorsPage=1;save();render();return;}
  if(event.target.id==='new-order-form'){
    event.preventDefault();const form=new FormData(event.target);const o={id:makeOrderId(),influencer:String(form.get('influencer')).trim(),handle:String(form.get('handle')||'').trim()||'@newcreator',region:String(form.get('region')||'待补充'),price:0,channel:String(form.get('channel')||'YouTube'),format:'',status:String(form.get('status')||'待审提报'),owner:String(form.get('owner')||state.activeUser),group:String(form.get('group')||currentPermission().group||''),created:new Date().toISOString(),category:String(form.get('category')||'日常生活'),days:0,email:'',proposal:String(form.get('proposal')||''),brief:'',script:'',sample:'',postLink:'',adCode:'',rawVideo:'',labels:[],rights:{boosting:'无',usage:'无'},log:[]};addOrderLog(o,'创建合作订单');state.orders.unshift(o);state.drawer=null;state.activePage='orders';state.ordersPage=1;save();toast('订单已创建。');render();return;
  }
  if(event.target.id==='assign-creator-form'){
    event.preventDefault();const f=new FormData(event.target),c=state.creators.find((x)=>x.id===event.target.dataset.id);if(c){c.owner=String(f.get('owner')||'')||null;c.group=String(f.get('group')||'');c.state=c.owner?'已入库':'公共池';c.reserveUntil=null;addCreatorLog(c,`管理员将达人分配给 ${c.owner||'公共池'}，不受 7 天锁定限制`);save();toast('达人归属已更新。');render();}return;
  }
  if(event.target.id==='split-creator-form'){
    event.preventDefault();const channelName=String(new FormData(event.target).get('channel')||''),c=state.creators.find((x)=>x.id===event.target.dataset.id);if(c&&c.channels.length>1&&c.channels.includes(channelName)){c.channels=c.channels.filter((x)=>x!==channelName);c.socials=(c.socials||[]).filter((s)=>!s.toLowerCase().includes(channelName.toLowerCase()));const split={...c,id:makeCreatorId(),channels:[channelName],socials:[],state:'公共池',owner:null,group:'',reserveUntil:null,emailSentAt:null,log:[]};addCreatorLog(c,`管理员将 ${channelName} 渠道拆分为新档案 ${split.id}`);addCreatorLog(split,`从 ${c.id} 拆分而来`);state.creators.unshift(split);state.drawer={type:'creator',id:c.id};save();toast(`已拆分 ${channelName} 渠道，生成新达人 ID。`);render();}return;
  }
  if(event.target.id==='request-permission'){
    event.preventDefault();const f=new FormData(event.target),channels=f.getAll('channels');if(!channels.length){toast('请至少选择一个操作渠道。','error');return;}
    state.requests.unshift({name:String(f.get('name')).trim(),email:'',role:String(f.get('role')||'组员'),channels,group:currentPermission().group||'朴银英组',created:new Date().toISOString()});save();toast('权限申请已提交，等待管理员审批。');render();return;
  }
  if(event.target.id==='grant-permission'){
    event.preventDefault();if(!isAdmin())return;const f=new FormData(event.target),channels=f.getAll('channels'),name=String(f.get('name')).trim();if(!channels.length){toast('请至少选择一个操作渠道。','error');return;}
    if(state.permissions.some((u)=>u.name.toLowerCase()===name.toLowerCase())){toast('这个运营已经有权限记录。','error');return;}
    const role=String(f.get('role')||'组员'),group=String(f.get('group')||'');state.permissions.push({name,email:String(f.get('email')||''),role,group,channels,managedGroups:role==='管理员'?[...GROUPS]:role==='组长'?[group]:[],active:true});save();toast(`已为 ${name} 开通权限。`);render();return;
  }
});

document.addEventListener('change',(event)=>{
  if(event.target.id==='user-role-switch'){
    const [name,role]=event.target.value.split('|');state.activeUser=name;state.activeRole=role;state.ordersPage=1;state.creatorsPage=1;save();render();return;
  }
  if(event.target.matches('[data-action="change-order-status"]')){
    const o=state.orders.find((x)=>x.id===event.target.dataset.id),next=event.target.value;if(!o)return;
    if((STATUS_RANK[next]??99)>(STATUS_RANK[o.status]??0)){toast('暂时不能跳到尚未完成的阶段。','error');renderDrawer();return;}
    if(next!==o.status){const previous=o.status;o.status=next;o.days=0;saveOrder(o,`订单状态从「${previous}」改为「${next}」`);toast('订单状态已更新。');render();}return;
  }
  if(event.target.matches('[data-creator-check]')){
    const id=event.target.dataset.creatorCheck;state.selectedCreators=event.target.checked?[...new Set([...state.selectedCreators,id])]:state.selectedCreators.filter((x)=>x!==id);save();render();return;
  }
  if(event.target.matches('[data-action="select-all-creators"]')){
    const checked=event.target.checked;const visible=[...document.querySelectorAll('[data-creator-check]')].map((x)=>x.dataset.creatorCheck);state.selectedCreators=checked?[...new Set([...state.selectedCreators,...visible])]:state.selectedCreators.filter((x)=>!visible.includes(x));save();render();return;
  }
  if(event.target.matches('[data-order-label]')){
    const o=readOrderFields(event.target.dataset.orderId);if(o){saveOrder(o,'更新发布内容标签');}return;
  }
  if(event.target.matches('[data-creator-field]')){
    const c=state.creators.find((x)=>x.id===event.target.dataset.creatorId);if(c){c[event.target.dataset.creatorField]=event.target.value;addCreatorLog(c,'更新达人联系方式');save();}return;
  }
});

document.addEventListener('change',(event)=>{
  if(event.target.matches('[data-order-field="channel"]')){
    const id=event.target.dataset.orderId,o=state.orders.find((x)=>x.id===id);if(!o)return;o.channel=event.target.value;o.format='';save();renderDrawer();return;
  }
});

document.addEventListener('change',(event)=>{
  if(event.target.id==='creator-upload'){
    const file=event.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>importCreators(String(reader.result||''));reader.readAsText(file);event.target.value='';
  }
});

const ticker=()=>{const before=state.creators.filter((c)=>c.state==='已入库'&&c.reserveUntil&&!c.emailSentAt&&new Date(c.reserveUntil).getTime()<=Date.now()).length;if(before){refreshReservations();if(state.activePage==='creators')render();}};
setInterval(ticker,60000);
render();
