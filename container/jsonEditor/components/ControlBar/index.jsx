import React from 'react'

import { BarContainer, ActionButton } from './styles'

const ControlBar = ({
  fileName,
  isEditing,
  // onPull,
  onToggleEdit,
  onPush,
  onSync,
  onMergeToLocal,
}) => (
  <BarContainer>
    <ActionButton onClick={onSync} disabled={!fileName || !isEditing}>
      Sync
    </ActionButton>
    {/* <ActionButton onClick={onPull} disabled={!fileName || !isEditing}>
      Pull S3
    </ActionButton> */}
    <ActionButton onClick={onToggleEdit} disabled={!fileName}>
      {isEditing ? 'Save' : 'Edit'}
    </ActionButton>
    <ActionButton onClick={onPush} disabled={!fileName || isEditing}>
      Push S3
    </ActionButton>
    <ActionButton onClick={onMergeToLocal} disabled={!fileName || isEditing}>
      MR to local
    </ActionButton>
  </BarContainer>
)

export default ControlBar
