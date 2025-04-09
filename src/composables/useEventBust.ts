import mitt from 'mitt'

type Events = {
  'create-student': void
}

export const useEventBus = mitt<Events>()
