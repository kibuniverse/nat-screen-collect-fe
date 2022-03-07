import * as React from 'react';
import dayjs from 'dayjs';
import { useHistory } from '@modern-js/runtime/router';
import {
  Form,
  Button,
  Cascader,
  Input,
  ImageUploader,
  Dialog,
  Picker,
  Toast,
} from '@/nat/utils/import';
import { classOptions, dateColumns } from '@/nat/data';
import { uploadNatImage } from '@/nat/api';

const Upload: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [datePickerVisible, setDataPickerVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [natScreen, setNatScreen] = React.useState<File>();
  const history = useHistory();

  const handleUploadImg = async (file: File) => {
    setNatScreen(file);
    return { url: window.URL.createObjectURL(file) };
  };

  const handleUpload = async (v: any) => {
    if (!natScreen) {
      Dialog.alert({
        content: '请上传截图',
      });
    }
    const formData = new FormData();
    formData.append('file', natScreen as File);
    formData.append('name', v.name);
    formData.append('class', v.class);
    formData.append('date', v.date);

    setLoading(true);
    const delayCancel = setTimeout(() => {
      Toast.show('服务器出小差了,请联系 @严凯治 解决');
      setLoading(false);
    }, 5000);

    const { data } = await uploadNatImage(formData);
    clearTimeout(delayCancel);

    if (data.success) {
      setTimeout(() => {
        setLoading(false);
        history.push('/success');
      }, 500);
    }
  };
  const handleFieldChange = (v: Record<string, any>[] = []) => {
    const dateObj = v.find(item => item.name[0] === 'date');
    if (dateObj) {
      const [, day] = dateObj.value;
      if (
        String(day) !== dayjs().format('DD') &&
        String(day) !== dayjs().format('D')
      ) {
        Toast.show('你选择的日期不是今天，看清楚后再提交哦～');
      }
    }
  };

  return (
    <div>
      <Form
        onFinish={handleUpload}
        onFieldsChange={handleFieldChange}
        footer={
          <Button
            block={true}
            loading={loading}
            loadingText="提交中"
            type="submit"
            color="primary"
            size="large">
            提交
          </Button>
        }
        initialValues={{
          date: ['1', dayjs().format('DD')],
        }}>
        <Form.Header>每日核酸结果统计</Form.Header>
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '姓名不能为空' }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
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
          onClick={() => setDataPickerVisible(true)}
          rules={[{ required: true, message: '日期不能为空' }]}>
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
                return items.map(item => item?.label ?? '未选择').join('-');
              }
            }}
          </Picker>
        </Form.Item>

        <Form.Item label="核酸检测截图" name="img">
          <ImageUploader upload={handleUploadImg} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Upload;
