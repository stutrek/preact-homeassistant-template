import type { HomeAssistant } from 'preact-homeassistant';
import type { __CardClass__Config } from './__CardClass__';

interface __CardClass__EditorProps {
  hass: HomeAssistant;
  config: __CardClass__Config;
  onConfigChanged: (config: __CardClass__Config) => void;
}

export function __CardClass__Editor({ hass, config, onConfigChanged }: __CardClass__EditorProps) {
  const sensorEntities = Object.keys(hass.states)
    .filter((id) => id.startsWith('sensor.'))
    .sort();

  return (
    <div style={{ padding: '16px' }}>
      <ha-select
        label="Sensor entity"
        value={config.entity ?? ''}
        naturalMenuWidth
        fixedMenuPosition
        onChange={(e: any) =>
          onConfigChanged({ ...config, entity: e.detail?.value ?? e.target?.value })
        }
        onclosed={(e: Event) => e.stopPropagation()}
      >
        {sensorEntities.map((id) => (
          <ha-list-item key={id} value={id}>
            {hass.states[id]?.attributes?.friendly_name ?? id}
          </ha-list-item>
        ))}
      </ha-select>
    </div>
  );
}
