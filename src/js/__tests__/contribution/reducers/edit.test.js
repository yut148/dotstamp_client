import * as types from "../../../constants/ActionTypes"
import reducer from "../../../redux/contribution/reducers/edit"
import {VIEW_STATUS_PUBLIC} from "../../../constants/contribution"

describe("contribution/reducers/edit", () => {
  it("詳細を取得する", () => {
    const expected = {
      type: types.GET_CONTRIBUTION_EDIT,
      response: {
        ID: 1,
        Title: "abc",
        Body: {
          aa: "abcdef",
        },
        Tag: [
          "efg",
          "hij"
        ]
      }
    }

    const result = reducer(undefined, expected)

    expect(result).toEqual({
      body: {
        aa: "abcdef",
      },
      id: 1,
      tagList: [
        "efg",
        "hij"
      ],
      title: "abc",
      saveData: {
        title: "abc",
        body: JSON.stringify({
          aa: "abcdef",
        }),
        viewStatus: VIEW_STATUS_PUBLIC,
      },
    })
  })
})
