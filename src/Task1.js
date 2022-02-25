// Create an array of colors (as strings). Create a createColorManager function that produces
// colorManager. colorManager should only have methods (and no properties)...

export const Task1 = () => {
  const createColorManager = (defaultColor = 'purple') => {
    const colors = [
      defaultColor,
      'red',
      'yellow',
      'gold',
      'green',
      'blue',
      'orange',
    ];
    let index = 0;

    const colorManager = {
      get: () => colors[index],

      next: () => {
        index++;
        if (index >= colors.length) index = 0;
      },

      prev: () => {
        index--;
        if (index < 0) index = colors.length - 1;
      },

      reset: () => (index = 0),
    };
    return colorManager;
  };

  // Can instantiate an independent colorManager with a new color or leave as default
  const colorManager = createColorManager();
  // const colorManager2 = createColorManager('brown');

  // Can input following commands:
  // colorManager.next();
  // colorManager.next();
  // colorManager.prev();
  // colorManager.reset();

  return <div className="colorManager">{colorManager.get()}</div>;
};
