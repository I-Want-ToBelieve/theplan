/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const createComputer = ({
  mac,
  ipv4,
  user
}: any) => {
  const computer = {
    mac,
    ipv4,
    user
  }

  return computer
}
