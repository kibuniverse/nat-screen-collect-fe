import * as React from 'react';
import { PickerColumn } from 'antd-mobile/es/components/picker-view';
import CollectResult from '@/nat/components/collect-result';
import { getUploadedDate } from '@/nat/api';
import { Form, Picker, Cascader, Button } from '@/nat/utils/import';
import { classOptions } from '@/nat/data';
import { parseDate } from '@/nat/utils/parse-date';

const CollectInfo: React.FC = () => {
  const [pickerColnums, setPickerColnums] = React.useState<PickerColumn[]>([]);
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [casVisible, setCasVisible] = React.useState(false);
  const [selectInfo, setSelectInfo] = React.useState<Record<string, any>>();

  React.useEffect(() => {
    (async function () {
      const { data } = await getUploadedDate();
      console.info(data);
      const pickerColnumsTemp: PickerColumn[] = [
        data.map(item => ({
          value: item,
          label: parseDate(item),
        })),
      ];
      setPickerColnums(pickerColnumsTemp);
    })();
  }, []);

  const handleSelect = (v: Record<string, any> = []) => {
    const classes = v.class?.[1];
    const date = v.date?.[0];
    setSelectInfo({ classes, date });
  };

  return (
    <div>
      <Form
        onFinish={handleSelect}
        footer={
          <Button
            block={true}
            loadingText="提交中"
            type="submit"
            color="primary"
            size="large">
            查询
          </Button>
        }>
        <Form.Header>结果查看页面</Form.Header>
        <Form.Item
          label="上传时间"
          name="date"
          trigger="onConfirm"
          onClick={() => setPickerVisible(true)}
          rules={[{ required: true, message: '请选择日期' }]}>
          <Picker
            columns={pickerColnums}
            visible={pickerVisible}
            onClose={() => setPickerVisible(false)}>
            {items => {
              if (items.every(item => item === null)) {
                return '未选择';
              } else {
                return items.map(item => item?.label ?? '未选择').join('-');
              }
            }}
          </Picker>
        </Form.Item>
        <Form.Item
          name="class"
          label="班级"
          trigger="onConfirm"
          onClick={() => {
            setCasVisible(true);
          }}
          rules={[{ required: true, message: '班级不能为空' }]}>
          <Cascader
            options={classOptions}
            visible={casVisible}
            onClose={() => {
              setCasVisible(false);
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
      </Form>
      <CollectResult {...selectInfo} />
    </div>
  );
};

export default CollectInfo;
