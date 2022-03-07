import * as React from 'react';
import { getClassesDayInfo } from '@/nat/api';
import {
  ProgressCircle,
  Card,
  Divider,
  Space,
  List,
  Button,
} from '@/nat/utils/import';
import { parseDate } from '@/nat/utils/parse-date';
import { obj2UrlParams } from '@/nat/utils/obj2urlparams';

const InfoTextStyle = {
  fontSize: '1rem',
};

type IProps = {
  date?: string;
  classes?: string;
};

const CollectResult: React.FC<IProps> = props => {
  const { date = '', classes = '' } = props;
  const [uploadInfo, setUploadInfo] = React.useState<API.ClassesDayInfo>();

  React.useEffect(() => {
    if (!date || !classes) {
      return;
    }
    (async function () {
      const { data } = await getClassesDayInfo({ date, classes });
      setUploadInfo(data.data);
    })();
  }, [date, classes]);

  const handleDownloadZip = () => {
    window.open(`/download?${obj2UrlParams(props)}`);
  };

  return (
    <div>
      {uploadInfo && (
        <>
          <Divider />
          <Card
            headerStyle={{
              color: '#1677ff',
            }}
            title={`${classes}班${parseDate(date)}核酸截图统计信息`}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Space direction="vertical">
                <div style={InfoTextStyle}>
                  应提交人数: {uploadInfo.studentCount}人
                </div>
                <div style={InfoTextStyle}>
                  已提交人数: {uploadInfo.uploadStudentCount}人
                </div>
              </Space>
              <ProgressCircle
                percent={uploadInfo.percent}
                style={{ '--track-width': '8px', '--size': '100px' }}>
                <span>{uploadInfo.percent}%</span>
              </ProgressCircle>
            </div>
            <Button color="primary" fill="outline" onClick={handleDownloadZip}>
              下载已上传压缩包
            </Button>
          </Card>
          <Divider style={{ fontSize: '1rem', color: '#1677ff' }}>
            今日已提交同学名单
          </Divider>
          <List>
            {uploadInfo.uploadUserList.map(item => (
              <List.Item key={item}>{item.split('.')[0]}</List.Item>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default CollectResult;
