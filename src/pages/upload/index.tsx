import * as React from 'react';
import {
  Form,
  Button,
  Cascader,
  Input,
  ImageUploader,
  Dialog,
  Picker,
  Toast,
} from '@/utils/import';
import { classOptions, dateColumns } from '@/data';
import { uploadNatImage } from '@/api/upload';

const Upload: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [datePickerVisible, setDataPickerVisible] = React.useState(false);

  const [natScreen, setNatScreen] = React.useState<File>();

  const handleUploadImg = async (file: File) => {
    console.info(file);
    setNatScreen(file);
    return { url: window.URL.createObjectURL(file) };
  };

  const handleUpload = async (v: any) => {
    if (!natScreen) {
      Dialog.alert({
        content: '请上传截图',
        onConfirm: () => {
          console.info('Confirmed');
        },
      });
    }
    console.info(v);
    const formData = new FormData();
    formData.append('file', natScreen as File);
    formData.append('name', v.name);
    formData.append('class', v.class);
    formData.append('date', v.date);

    const ans = await uploadNatImage(formData);
    console.info(ans);
    if (ans.success) {
      Toast.show('上传成功✨');
    }
  };

  return (
    <div>
      <Form
        onFinish={handleUpload}
        footer={
          <Button block={true} type="submit" color="primary" size="large">
            提交
          </Button>
        }>
        <Form.Header>每日核酸结果统计</Form.Header>
        <Form.Item
          name="class"
          label="班级"
          trigger="onConfirm"
          onClick={() => {
            setVisible(true);
          }}
          rules={[{ required: true, message: '班级不能为空' }]}>
          <Cascader
            options={classOptions}
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}>
            {items => {
              if (items.every(item => item === null)) {
                return '未选择';
              } else {
                return items.map(item => item?.label ?? '未选择').join('-');
              }
            }}
          </Cascader>
        </Form.Item>
        <Form.Item
          label="日期"
          trigger="onConfirm"
          name="date"
          onClick={() => setDataPickerVisible(true)}>
          <Picker
            columns={dateColumns}
            visible={datePickerVisible}
            onClose={() => {
              setDataPickerVisible(false);
            }}>
            {items => {
              if (items.every(item => item === null)) {
                return '未选择';
              } else {
                return items.map(item => item?.label ?? '未选择').join(' - ');
              }
            }}
          </Picker>
        </Form.Item>
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '姓名不能为空' }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item label="核酸检测截图" name="img">
          <ImageUploader upload={handleUploadImg} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Upload;
