module.exports = (api) => {
    // Добавляем плагин только для тестового окружения
    const plugins = [];

    if (api.env('test')) {
      plugins.push([
        'effector/babel-plugin',
        'module-resolver',
        {
          root: ['.'],
          alias: {
            "effector-react": 'effector-react/scope',
          },
        },
      ]);
    }
  
    return {
      plugins
    };
  };
  