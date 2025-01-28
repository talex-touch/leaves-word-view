import { COZE_CN_BASE_URL, CozeAPI, RoleType } from '@coze/api'
import axios from 'axios'
export const TOKEN = process.env.COZE_API_TOKEN || 'pat_wRaxoZvvJzSW9tHK0ELzVayjGwSKNnodhrMeduaLeSQQ4fLcC19DoLF9TlfXxwrB'

const axiosInstance = axios.create({
  baseURL: COZE_CN_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
})

export const cozeClient = new CozeAPI({
  allowPersonalAccessTokenInBrowser: true,
  baseURL: COZE_CN_BASE_URL,
  token: TOKEN,
  axiosInstance
})

/**
 * 创建单词信息补全对话
 * @param word 需要补全的单词
 * @param info 是否基于目前已有的信息做补全
 */
function callWordSupplymentAI(word: string, info: string = '') {
  const content = '当前单词: ' + word + (info?.length ? '\n基于以下信息做补充,请尽可能全面:' + info : '')

  return cozeClient.chat.stream({
    bot_id: '7461618566446923810',
    additional_messages: [
      {
        role: RoleType.User,
        content,
        content_type: 'text'
      }
    ]
  })
}

export function useLeavesWordAI() {
  return {
    callWordSupplymentAI
  }
}