import type { Meta, StoryObj } from '@storybook/preact-vite';
import { useState } from 'preact/hooks';
import type { __CardClass__Config } from '../__CardClass__/__CardClass__';
import { __CardClass__Editor } from '../__CardClass__/__CardClass__Editor';
import { createMockHass } from '../__test-utils__/mockHass';
import '../__test-utils__/ha-stubs';

const meta: Meta<typeof __CardClass__Editor> = {
  title: '__CardClass__Editor',
  component: __CardClass__Editor,
};

export default meta;
type Story = StoryObj<typeof __CardClass__Editor>;

const sensors = {
  'sensor.temperature': {
    entity_id: 'sensor.temperature',
    state: '72',
    attributes: { friendly_name: 'Living Room Temperature' },
  },
  'sensor.humidity': {
    entity_id: 'sensor.humidity',
    state: '48',
    attributes: { friendly_name: 'Kitchen Humidity' },
  },
  'sensor.battery': {
    entity_id: 'sensor.battery',
    state: '84',
    attributes: { friendly_name: 'Phone Battery' },
  },
  'binary_sensor.motion': {
    entity_id: 'binary_sensor.motion',
    state: 'off',
    attributes: { friendly_name: 'Hallway Motion' },
  },
};

const EditorHarness = ({ initial }: { initial: __CardClass__Config }) => {
  const [config, setConfig] = useState<__CardClass__Config>(initial);
  const hass = createMockHass({ entities: sensors });

  return (
    <div style={{ maxWidth: 420 }}>
      <__CardClass__Editor hass={hass} config={config} onConfigChanged={setConfig} />
      <pre style={{ marginTop: 16, padding: 12, background: '#1c1c1c', color: '#e1e1e1' }}>
        config = {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  );
};

export const Empty: Story = {
  render: () => <EditorHarness initial={{ entity: '' }} />,
};

export const Preselected: Story = {
  render: () => <EditorHarness initial={{ entity: 'sensor.humidity' }} />,
};
