import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components'

export const TestSelect = () => (
  <Select>
    <Label>Favorite Animal</Label>
    <Button>
      <SelectValue />
      <span aria-hidden="true">▼</span>
    </Button>
    <Popover>
      <ListBox>
        <ListBoxItem>Cat</ListBoxItem>
        <ListBoxItem>Dog</ListBoxItem>
        <ListBoxItem>Kangaroo</ListBoxItem>
      </ListBox>
    </Popover>
  </Select>
)

export const projectName = '(c) 2024 Common Prayer Project'
