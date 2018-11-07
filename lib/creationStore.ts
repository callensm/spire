import { observable, action } from 'mobx'

const defaultValues = {
  code: '// Provide the path to the source code file',
  language: 'javascript',
  source: null,
  origin: '',
  description: ''
}

export class CreationStore {
  @observable
  code: string = '// Provide the path to the source code file'

  @observable
  language: string = 'javascript'

  @observable
  source: 'gist' | 'repo' | null

  @observable
  origin: string

  @observable
  description: string = ''

  @action.bound
  setCode(code: string) {
    this.code = code
  }

  @action.bound
  setLanguage(lang: string) {
    this.language = lang
  }

  @action.bound
  setSource(src: 'gist' | 'repo' | null) {
    this.source = src
  }

  @action.bound
  setOrigin(origin: string) {
    this.origin = origin
  }

  @action.bound
  appendOrigin(str: string) {
    this.origin += str
  }

  @action.bound
  setDescription(desc: string) {
    this.description = desc
  }

  @action.bound
  reset() {
    this.code = defaultValues.code
    this.language = defaultValues.language
    this.source = defaultValues.source
    this.origin = defaultValues.origin
    this.description = defaultValues.description
  }
}

export default new CreationStore()
