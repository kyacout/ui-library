import has from 'lodash/has'

interface Metric {
  id: string
  label: 'custom' | 'web-vital'
  name: string
  startTime: number
  value: number
}

const metrics: Record<string, number> = {}

export const setPerformanceMetric = (metric: Metric) => {
  metrics[metric.name] = metric.value
}

export const getPerformanceMetricValue = (metricName: string): false | number => {
  if (!has(metrics, metricName)) {
    return false
  }

  return metrics[metricName]
}
