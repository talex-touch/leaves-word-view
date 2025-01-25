import { Form, Input, Button, Drawer, message, Checkbox, Tabs } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import InfoComponent from './InfoComponent';
import WordPronounceEditor from './WordPronounceEditor';
import WordTranslationEditor from './WordTranslationEditor';
import { emptyWordContent, parseWordContent } from './types/WordContent';
import { isValidPronounce, isValidTranslationList, isValidWordAffixPartList, isValidWordDerivedList, isValidWordTransformList, WordExampleTypeEnum } from './types';
import WordDerivedEditor from './WordDerivedEditor';
import WordImageEditor, { WordImageCreator } from './WordImageEditor';
import WordAffixEditor from './WordAffixEditor';
import WordTransformEditor from './WordTransformEditor';
import WordExampleListEditor from './WordExampleListEditor';

export type Prop = {
  data: API.EnglishWord;
  value?: string | null;
  editable?: boolean;
  onChange?: (wordContent: string) => void;
}

enum ParseStatus {
  UNKNOWN = -1,
  NORMAL = 0,
  ERROR = 1,
  SYNCHORNISED = 2
}

const WordContentEditor: React.FC<Prop> = ({ data, value, editable, onChange }) => {
  const [form] = Form.useForm();
  const [currentContent, setCurrentContent] = useState(emptyWordContent());
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [isAdvancedFeaturesEnabled, setAdvancedFeaturesEnabled] = useState(false);
  const [infoData, setInfoData] = useState(value || '');
  const [parseStatus, setParseStatus] = useState<ParseStatus>(ParseStatus.NORMAL);
  const [tipMsg, setTipMsg] = useState('');

  function tryParseInfo(info: string) {
    const [parsedInfo, parseStatus, msg] = parseWordContent(info);

    if (parsedInfo) {
      setInfoData(JSON.stringify(parsedInfo, null, 2));
      setCurrentContent(parsedInfo);
      setParseStatus(ParseStatus.SYNCHORNISED);

      onChange?.(JSON.stringify(parsedInfo, null, 2));

      form.setFieldsValue(currentContent);

      return
    }

    setTipMsg('');
    if (parsedInfo && !parseStatus) {
      setTipMsg(msg!);
      setParseStatus(ParseStatus.ERROR);

      console.warn("解析失败，请检查输入格式！")
    } else {
      console.warn(parsedInfo)

      setParseStatus(ParseStatus.UNKNOWN);
    }
  }

  useEffect(() => {
    setInfoData(value || '');
  }, [value, isDrawerVisible]);

  const handleSave = () => {
    form.validateFields().then(values => {
      message.loading("正在检验配置...")

      if (!isValidPronounce(currentContent.britishPronounce)) {
        message.error("英式发音未通过检验！")
        return;
      }

      if (!isValidPronounce(currentContent.americanPronounce)) {
        message.error("美式发音未通过检验！")
        return;
      }

      if (!currentContent.img.length) {
        message.error("图片列表未通过检验！")
        return;
      }

      if (isValidTranslationList(currentContent.translation)) {
        message.error("翻译列表未通过检验！")
        return;
      }

      if (!currentContent.examplePhrases.length || !(currentContent.examplePhrases.every(example => example.type === WordExampleTypeEnum.PHRASE && example.translation))) {
        message.error("短语列表未通过检验！")
        return;
      }

      if (isValidWordDerivedList(currentContent.derived)) {
        message.error("单词网络列表未通过检验！")
        return;
      }

      if (isValidWordTransformList(currentContent.transform)) {
        message.error("词形变化列表未通过检验！")
        return;
      }

      if (isValidWordAffixPartList(currentContent.parts)) {
        message.error("单词组成列表未通过检验！")
        return;
      }

      message.success("检验通过！")
      setCurrentContent(values);
      setInfoData(JSON.stringify(currentContent, null, 2));
      setDrawerVisible(false);

      onChange?.(JSON.stringify(currentContent));
    });
  };

  const handleInfoChange = (newInfo: string) => {
    setInfoData(newInfo);
  }

  useEffect(() => {
    tryParseInfo(infoData || '')
  }, [infoData])

  const renderStatusTip = useMemo(() => {
    if (parseStatus === ParseStatus.NORMAL) return null

    if (parseStatus === ParseStatus.SYNCHORNISED) {
      return <span>
        已同步至单词编辑器
      </span>
    }

    if (parseStatus === ParseStatus.ERROR) {
      return <span>
        结构不一致，<Button color='primary' variant="text" onClick={() => {
          const [parsedInfo] = parseWordContent(infoData!);
          if (!parsedInfo) {
            message.error("解析失败，请检查输入格式！")
            return;
          }

          setInfoData(JSON.stringify(parsedInfo, null, 2));
          setCurrentContent(parsedInfo!);
          setParseStatus(ParseStatus.SYNCHORNISED);
        }}>点击这里强行转换</Button>
        <span>
          {tipMsg}
        </span>
      </span>
    }

    if (parseStatus === ParseStatus.UNKNOWN) {
      return <span>
        未知的格式，无法完成解析
      </span>
    }

  }, [parseStatus])

  const renderWordEditor = useMemo(() => (
    <>
      <Tabs
        className='h-full'
        defaultActiveKey={editable ? "1" : "0"}
        tabPosition='left'
        items={[
          ...(editable ? [] : [{
            label: '综合审阅',
            key: '0',
            children: (
              <>
                <Form.Item label="审阅评价">
                  当前暂无任何评价.
                </Form.Item>
                <Form.Item label="JSON数据">
                  <InfoComponent readonly onChange={handleInfoChange} data={infoData} />
                </Form.Item>
              </>
            ),
          }]),
          {
            label: '发音配置',
            key: '1',
            children: (
              <>
                <Form.Item name="britishPronounce" label="英式发音" rules={[{ required: true, message: '请输入英式发音!' }]}>
                  <WordPronounceEditor value={currentContent.britishPronounce} onChange={(pronounce) => setCurrentContent({ ...currentContent, britishPronounce: pronounce })} />
                </Form.Item>
                <Form.Item name="americanPronounce" label="美式发音" rules={[{ required: true, message: '请输入美式发音!' }]}>
                  <WordPronounceEditor value={currentContent.americanPronounce} onChange={(pronounce) => setCurrentContent({ ...currentContent, americanPronounce: pronounce })} />
                </Form.Item>
              </>
            ),
          },
          {
            label: '图片列表',
            key: '2',
            children: (
              <>
                <Form.Item name="img" label="图片列表" rules={[{ required: true, message: '请输入图片列表!' }]}>
                  <span className='hidden'>
                    {JSON.stringify(currentContent.img)}
                  </span>
                  <WordImageEditor value={currentContent.img} onChange={(img) => setCurrentContent({ ...currentContent, img: img })} />
                </Form.Item>
                {data?.id && <WordImageCreator wordId={data.id!} onSubmit={(img) => setCurrentContent({ ...currentContent, img: [...currentContent.img, img] })} />}
              </>
            ),
          },
          {
            label: '翻译',
            key: '3',
            children: (
              <Form.Item name="translation" label="翻译" rules={[{ required: true, message: '请编辑翻译内容!' }]}>
                <WordTranslationEditor
                  initialTranslations={currentContent.translation}
                  onSave={(updatedTranslations) => setCurrentContent({ ...currentContent, translation: updatedTranslations })}
                />
              </Form.Item>
            ),
          },
          {
            label: '短语',
            key: '4',
            children: (
              <Form.Item name="examplePhrases" label="短语" rules={[{ required: true, message: '请编辑短语!' }]}>
                <WordExampleListEditor
                  value={currentContent.examplePhrases}
                  onChange={(updatedExamplePhrased) => setCurrentContent({ ...currentContent, examplePhrases: updatedExamplePhrased })}
                />
              </Form.Item>
            ),
          },
          {
            label: '词形变化',
            key: '5',
            children: (
              <Form.Item name="transform" label="词形变化" rules={[{ required: true, message: '请编辑词形变化!' }]}>
                <WordTransformEditor
                  initialTransforms={currentContent.transform}
                  onSave={(updatedTransforms) => setCurrentContent({ ...currentContent, transform: updatedTransforms })}
                />
              </Form.Item>
            ),
          },
          {
            label: '单词网络',
            key: '6',
            children: (
              <Form.Item name="derived" label="单词网络" rules={[{ required: true, message: '请编辑单词网络!' }]}>
                <WordDerivedEditor
                  initialDerivedWords={currentContent.derived}
                  onSave={(updatedDerivedWords) => setCurrentContent({ ...currentContent, derived: updatedDerivedWords })}
                />
              </Form.Item>
            ),
          },
          {
            label: '单词组成',
            key: '7',
            children: (
              <Form.Item name="parts" label="单词组成" rules={[{ required: true, message: '请编辑单词组成!' }]}>
                <WordAffixEditor
                  initialAffixParts={currentContent.parts}
                  onSave={(updatedAffixParts) => setCurrentContent({ ...currentContent, parts: updatedAffixParts })}
                />
              </Form.Item>
            ),
          },
          {
            label: '拓展功能',
            key: '8',
            children: (
              <>
                <Form.Item name="advancedFeatures" valuePropName="checked">
                  <Checkbox onChange={(e) => setAdvancedFeaturesEnabled(e.target.checked)}>启用拓展功能</Checkbox>
                </Form.Item>
                {isAdvancedFeaturesEnabled && (
                  <>
                    <Form.Item name="remember" label="记忆方法">
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="story" label="故事">
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="backgroundStory" label="背景故事">
                      <Input.TextArea rows={4} />
                    </Form.Item>
                  </>
                )}
              </>
            ),
          },
        ]}
      />
      <div className='z-5 flex justify-end sticky bottom-0'>
        {editable ? (
          <Button type="primary" onClick={handleSave}>
            校验并提交
          </Button>
        ) : (
          <>
            <Button variant='filled' color='volcano' onClick={handleSave}>
              提交审阅
            </Button>
          </>
        )}
      </div>
    </>
  ), [currentContent, isAdvancedFeaturesEnabled, infoData, handleSave, handleInfoChange, setAdvancedFeaturesEnabled, setCurrentContent, setInfoData, setDrawerVisible, setParseStatus, setTipMsg, tipMsg, parseStatus, parseWordContent, parseStatus]);

  return (
    <Form form={form} layout="vertical">
      {editable ? (
        <>
          <InfoComponent onChange={handleInfoChange} data={infoData} />

          <div style={{ marginTop: '0.5rem', opacity: '0.5' }}>
            {renderStatusTip}
          </div>

          <Button type="dashed" onClick={() => setDrawerVisible(true)}>
            进入单词编辑器
          </Button>
        </>
      ) : (
        <Button variant="outlined" color="volcano" onClick={() => setDrawerVisible(true)}>
          进入单词审阅器
        </Button>
      )}


      <Drawer
        title={editable ? "单词编辑器" : "单词审阅器"}
        placement="right"
        width='85%'
        destroyOnClose
        onClose={() => setDrawerVisible(false)}
        open={isDrawerVisible}
      >
        {renderWordEditor}
      </Drawer>

    </Form>
  );
};

export default WordContentEditor;


