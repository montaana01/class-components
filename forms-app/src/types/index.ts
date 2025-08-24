export type FormEntry = {
  id: string
  source: 'uncontrolled' | 'hookform'
  name: string
  age: number
  email: string
  gender: string
  country: string
  acceptTos: boolean
  pictureBase64?: string | null
  createdAt: number
}

export type State = {
  entries: FormEntry[]
  countries: string[]
  addEntry: (entry: Omit<FormEntry,'id'|'createdAt'>) => void
  setCountries: (countries: string[]) => void
}
