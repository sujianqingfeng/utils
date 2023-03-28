import { createRequest, createFilterEmptyInterceptor, createErrorMessageInterceptor, createExtractDataInterceptor } from '../index'

const request = createRequest()

const errorMessage = createErrorMessageInterceptor(
  {
    isInvalid: (response) => {
      console.log('isInvalid', response)
      const { data } = response
      const { code, msg } = data 
      if (code !== 0) {
        return msg
      }
    },
    showMessage: (msg) => {
      console.log(msg)
    }
  }
)
  
const extractData = createExtractDataInterceptor({
  extract: (res) => {
    return res.data.data
  }
})

request
  .useReqInterceptor(createFilterEmptyInterceptor())
  .useRespInterceptor(errorMessage, extractData)

