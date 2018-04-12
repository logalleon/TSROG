enum Status {
  SUCCESS,
  FAILURE
}

interface ActionResponse {
  status: Status,
  message?: string
}

const invalidInput = (keyValue: string) => {
  return `Unrecognized input '${keyValue}'.`
}

export { Status, ActionResponse, invalidInput }