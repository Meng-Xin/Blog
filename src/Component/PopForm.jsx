import React, { useState } from 'react'
import { Button, Modal, Form, Radio , Upload, message,Tag, Input,Card} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { getToken } from '../Utils/auth';
import { ArticleCateInfoApi, CreateArticleCateApi } from '../services/articleCate';
import { CreateArticleTagApi, GetArticleTagApi } from '../services/articleTag';
import { CreateArticleApi } from '../services/articles';
// import { CreateArticleTagApi } from '../services/articleTag';


interface Values {
    articleCate: string;
    articleTag: string;
    articleConver: string;
    modifier: string;
    selectTag: string;
    selectType: strng;
    testTag : string;
  }
interface CollectionCreateFormProps {
visible: boolean;
onCreate: (values: Values) => void;
onCancel: () => void;
}
//初始化文章信息内容
const articles = {
  title   :   '',
  content :   '',
  cate_name   :   '',
  cate_id :   0,
  tag_name    :   [],
  tag_id  :   [],
  imgurl  :   '',
  status  :   0,
}

//一级弹出层
export default function PopForm(md,title) {
 
    //弹出层 TypeScript 泛型加载 页面内容
    const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
        visible,
        onCreate,
        onCancel,
      }) => {
        const [form] = Form.useForm();
        // form.setFieldsValue({
        //   modifier : 'public',
        //   articleTag  : articles.tag_name,
        //   articleCate : articles.cate_name,

        // })
        return (
          <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
              form
                .validateFields()
                .then(values => {
                  form.resetFields();
                  onCreate(values);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            
            <Form
              form={form}
              layout="horizontal"
              name="form_in_modal"
              initialValues={{articleCate:articles.cate_name,articleStatus:articles.status}}
            >
              <Form.Item
                name="articleCate"
                label="文章分类："
                // labelCol={{span: 4}}
                labelAlign	= 'left'
                // rules={[{ required: true, message: 'Please input the title of collection!' }]}
              >
                  <PopToCate />
               </Form.Item>
              <Form.Item name="articleTag" label="文章标签">
                  <PopToTag/>
              </Form.Item>
         
              <Form.Item name="articleConver" valuePropName="checked" label="上传图片：">
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        拖动图片进行上传，请上传文章封面
                    </p>
                </Dragger>
              </Form.Item>
              <Form.Item name="articleStatus" className="collection-create-form_last-form-item">
                <Radio.Group>
                  <Radio value={0}>Public</Radio>
                  <Radio value={1}>Private</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
        );
      };
    const { Dragger } = Upload;
    // 弹出层内部加载 上传图片
    const props = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:8080/api/v1/admin/article/imgUpload',
    headers	: {"Authorization":getToken()},
    onChange(info) {
        const { status,response } = info.file;
        if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        }
        if (status === 'done') {
        message.success(`${info.file.name} 图片上传成功~！.`);
       
        articles.imgurl = response.data
        console.log(articles)
        } else if (status === 'error') {
        message.error(`${info.file.name} 图片上传失败~！`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
    };
    // hooks 监听弹出层按钮 点了取消 还是 确定
    const [visible, setVisible] = useState(false);
      
    const onCreate = (values: any) => {
      articles.title = md.title
      articles.content = md.md
        console.log('提交表单信息',articles,"附加信息md:",md,"title:",title);
        //创建文章APi
        const {cate_id,content,imgurl,tag_id,status} = articles
        CreateArticleApi({
          "cate_id":cate_id,
          "title":articles.title,
          "content":content,
          "cover_img" : imgurl,
          "tag":tag_id,
          "status":status,
        }).then(res=>{
          if(res.msg==="成功"){
            console.log("创建文章API：",res.data)
          }
        }).catch(err=>{
            message.error("创建文章失败",err)
        })
        setVisible(false);
    };
    return (
        <div>
            <Button
            type="primary" onClick={() => {
                setVisible(true);
            }}
            > 发布文章</Button>
        
            <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
                setVisible(false);
            }}
            />
         </div>
    )
    
}

//二级弹出层  选择文章分类
export  function PopToCate(params) {
  const [cate,setCate] = useState('')
  const [cateList,setCateList] = useState([])
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    const handlerTestTag =(e)=>{
      console.log(e)
      //1、点击当前的按钮，那么直接拿到信息 将弹窗关闭。。。
      setCate(e.cate_name)
      articles.cate_name = e.cate_name
      articles.cate_id   = e.id
      setVisible(false);
    }
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout='vertical'
          name="form_in_modal"
          initialValues={{inputCate:cate,selectCate:articles.tag_name}}
        >
          <Form.Item
            name="inputCate"
            label="请输入或选择文章类型！"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
          >
          <Input />           
          </Form.Item>
          <Form.Item name="selectCate" label="Description">
              <Card style={{ width: 480 ,alignItems:'center' }}>
                {/* 这里从 hooks 里面取取出数据并渲染 */}
                {
                cateList.length>0?  
                cateList.map((cateItem)=>{return(
                  <Tag  color="#5cdbd3" key={cateItem.id} style={{marginBottom:10}} onClick={handlerTestTag.bind(this,cateItem)} >{cateItem.cate_name}</Tag>
                )}):''
                }
               
              </Card>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
    // hooks 监听弹出层按钮 点了取消 还是 确定
    const [visible, setVisible] = useState(false);
    const onCreate = (values: any) => {
        // console.log('Received values of form: ', values);
        console.log("当前的values:",values)
        articles.cate_name = values.inputCate
        // articles.cate_name =  values.inputCate  //设置文章分类名
        setCate(articles.cate_name)             //更新 state  
        console.log("创建文章分类：",articles.cate_name)
        // 创建当前文章分类api
        CreateArticleCateApi({
          "cate_name": articles.cate_name
        }).then(res=>{
          if(res.msg==="成功"){
            articles.cate_id = res.data.id
            articles.cate_name = res.data.cate_name
          }
          // console.log("当前的articles.cate_id",articles.cate_id)
        }).catch(err=>{
          console.log("CreateArticleCateApi 接口请求失败",err)
          message.error("CreateArticleCateApi 接口请求失败")
        })
        setVisible(false);
    };
    // Tab标签关闭状态
    function log(e) {
      articles.cate_name = '';
      setCate(articles.cate_name)
      console.log(e);
      
    }
  return (
        <div>
        {/* <Tag color="#5cdbd3" closable onClose={log} style={{lineHeight:2.5,paddingLeft:10,paddingRight:10}}>数组</Tag>
        <Tag color="#5cdbd3" closable onClose={log} style={{lineHeight:2.5,paddingLeft:10,paddingRight:10}}>矩阵</Tag> */}
        {(cate.length>0)? <Tag color="#5cdbd3" closable onClose={log}  style={{lineHeight:2.5,paddingLeft:10,paddingRight:10}}>{cate}</Tag>:''}
        {(cate.length>0)?'':
        <Tag color="#5cdbd3" style={{lineHeight:2.5,paddingLeft:10,paddingRight:10,cursor:'pointer'}}
        type="primary" onClick={() => {
            setVisible(true);
            // 这里展开选择分类弹窗，此时需要发送api，查询里面的文章分类id
            if (cateList.length >0){  //如果已经存在数据，没必要一直请求接口
              return null
            }
            //获取 文章分类信息
            ArticleCateInfoApi({
              
            }).then(res=>{
              if(res.msg==="成功"){
                setCateList(res.data)
                console.log(res.data)
              }
            }).catch(err=>{
              message.error("CreateArticleCateApi 接口请求失败")
            })
        }}
        > 选择分类</Tag>
        }
        

        <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
            setVisible(false);
        }}
        />
    </div>
  )
}
//二级弹出层  选择文章标签
export  function  PopToTag(params) {
  const [tag,setTag] = useState([])           //手动创建 state
  const [tagList,setTagList] = useState([])   //点击事件的state
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    const handlerTestTag =(e)=>{
      console.log(e)
       //1、点击当前的按钮，那么直接拿到信息 将弹窗关闭。。。
       articles.tag_name.push(e.tag_name)
       articles.tag_id.push(e.id)
       setTag(articles.tag_name)
       setVisible(false);
    }
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout='vertical'
          name="form_in_modal"
          initialValues={{ inputTag:[...tag],selectTag:null }}
        >
          <Form.Item
            name="inputTag"
            label="请输入或选择文章标签！"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
          >
          <Input />           
          </Form.Item>
          <Form.Item name="selectTag" label="Description">
              <Card style={{ width: 480 ,alignItems:'center' }}>
                {/* 这里从 hooks 里面取取出数据并渲染 */}
                {
                tagList.length>0?  
                tagList.map((tagItem)=>{return(
                  <Tag  color="#5cdbd3" key={tagItem.id} style={{marginBottom:10}} onClick={handlerTestTag.bind(this,tagItem)} >{tagItem.tag_name}</Tag>
                )}):''
                }


              </Card>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
    // hooks 监听弹出层按钮 点了取消 还是 确定
    const [visible, setVisible] = useState(false);
    const onCreate = (values: any) => {
     
        articles.tag_name.push(values.inputTag)           // 保存文章名称
        setTag(articles.tag_name)                         // 设置state 里面的tag_name
        // console.log('Received values of form: ', values);  //
        // console.log('创建文章标签： ',articles.tag_name);   //
        // TODO1 创建 文章标签Tag
        console.log("当前的TagList长度,",articles.tag_id.length)
        if(articles.tag_id.length>0){
          return null
        }
        CreateArticleTagApi({
          tag_name: articles.tag_name[articles.tag_name.length-1]
        }).then(res=>{
          console.log("成功：",res)
          if(res.msg === "成功"){
            //把后端返回的 id 添加到tag_id
            articles.tag_id.push(res.data.tag_id)
            setTagList(articles.tag_id)
          }
        }).catch(err=>{
          console.log("失败",err)
        })
      
        setVisible(false);
    };
    // Tab标签关闭状态
    function log(tags) {
      for(var i=0;i<articles.tag_name.length;i++){
        if(articles.tag_name[i] === tags){
            articles.tag_name.splice(i,1)   //删除当前选中的TagName
            articles.tag_id.splice(i,1)     //删除当前选中的TagId
        }
      }
      setTag([...articles.tag_name])
      console.log('关闭Tag:',tags,'关闭后的articles:',articles.tag_name,"当前的tag",tag.length);

    }
    
  return (
        <div>
          {/* 显示当前的 tag 标签 */}
        {(tag.length>0)?tag.map(tags=>{return(
          <Tag key={tags} color="#5cdbd3" closable onClose={log.bind(this,tags)}  style={{lineHeight:2.5,paddingLeft:10,paddingRight:10}}>{tags}</Tag>
        )}):
          ''
        }
        {(tag.length>2)?'':
        <Tag color="#5cdbd3" style={{lineHeight:2.5,paddingLeft:10,paddingRight:10,cursor:'pointer'}}
        type="primary" onClick={() => {
          //TODO 查询当前的Tag 标签，
        console.log("当前的TagList长度,",tagList.length)
        setVisible(true);
          
        if (tagList.length >0){  //如果已经存在数据，没必要一直请求接口
          return null
        }
        GetArticleTagApi({

        }).then(res=>{
          if(res.msg === "成功"){
            setTagList(res.data)
            console.log(tagList)
          }
        }).catch(err=>{
          console.log(err)
        })

        }}
        > 选择标签</Tag>
        }
        <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
            setVisible(false);
        }}
        />
    </div>
  )
}