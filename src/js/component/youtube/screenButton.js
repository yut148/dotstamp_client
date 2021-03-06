// @flow
import React from "react"
import {Button, Glyphicon} from "react-bootstrap"

type Props = {
  full?: boolean,
  onFull: Function,
  onSmaill: Function,
}

function button(full?: boolean, onFull :Function, onSmaill :Function) {
  if (full) {
    return (
      <Button onClick={() => onSmaill()}>
        <Glyphicon glyph="resize-small"/>
      </Button>
    )
  }

  return (
    <Button onClick={() => onFull()}>
      <Glyphicon glyph="resize-full"/>
    </Button>
  )
}

export default ({
  full,
  onFull,
  onSmaill,
}: Props) => {
  return button(full, onFull, onSmaill)
}
