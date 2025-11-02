export default ({ route, store, error, $auth, $config }) => {
  const metaRouteModule = route.meta.reduce((res, meta) => {
    if (meta.module) {
      res.push(...meta.module)
    }

    return res
  }, [])

  if (metaRouteModule.length) {
    const m = metaRouteModule.filter((item) => store.getters.activePagesProcessed.includes(item))

    if (!m.length) error({ statusCode: 401, message: 'Доступ запрещен' })
  }
}
