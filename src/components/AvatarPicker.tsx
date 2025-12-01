"use client";

import { useState, useCallback } from 'react';
import { Avatar, generateRandomConfig, defaultConfig } from './Avatar';
import {
  AvatarConfig,
  AvatarPickerProps,
  BACKGROUNDS,
  SKINS,
  TSHIRTS,
  EXPRESSIONS,
  HAIRS
} from '../types';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  preview: {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px'
  },
  controls: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  category: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    color: '#666'
  },
  options: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px'
  },
  option: {
    padding: '6px 12px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    background: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.15s ease'
  },
  optionSelected: {
    borderColor: '#007bff',
    background: '#e7f1ff',
    color: '#007bff'
  },
  randomButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600
  }
};

interface CategorySelectorProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

function CategorySelector<T extends string>({
  label,
  options,
  value,
  onChange
}: CategorySelectorProps<T>) {
  return (
    <div style={styles.category}>
      <span style={styles.label}>{label}</span>
      <div style={styles.options}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            style={{
              ...styles.option,
              ...(value === option ? styles.optionSelected : {})
            }}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AvatarPicker({
  value,
  onChange,
  className
}: AvatarPickerProps) {
  const [config, setConfig] = useState<AvatarConfig>(value || defaultConfig);

  const updateConfig = useCallback(
    <K extends keyof AvatarConfig>(key: K, val: AvatarConfig[K]) => {
      const newConfig = { ...config, [key]: val };
      setConfig(newConfig);
      onChange?.(newConfig);
    },
    [config, onChange]
  );

  const handleRandom = useCallback(() => {
    const newConfig = generateRandomConfig();
    setConfig(newConfig);
    onChange?.(newConfig);
  }, [onChange]);

  return (
    <div style={styles.container} className={className}>
      <div style={styles.preview}>
        <Avatar {...config} size={180} />
      </div>

      <div style={styles.controls}>
        <CategorySelector
          label="Background"
          options={BACKGROUNDS}
          value={config.background}
          onChange={(v) => updateConfig('background', v)}
        />

        <CategorySelector
          label="Skin"
          options={SKINS}
          value={config.skin}
          onChange={(v) => updateConfig('skin', v)}
        />

        <CategorySelector
          label="T-Shirt"
          options={TSHIRTS}
          value={config.tshirt}
          onChange={(v) => updateConfig('tshirt', v)}
        />

        <CategorySelector
          label="Expression"
          options={EXPRESSIONS}
          value={config.expression}
          onChange={(v) => updateConfig('expression', v)}
        />

        <CategorySelector
          label="Hair"
          options={HAIRS}
          value={config.hair}
          onChange={(v) => updateConfig('hair', v)}
        />

        <button
          type="button"
          style={styles.randomButton}
          onClick={handleRandom}
        >
          Randomize
        </button>
      </div>
    </div>
  );
}
