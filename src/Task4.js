// Create a bem object that builds a fully qualified class name using the BEM methodology. The bem
// object should have these methods:
// ● block - adds the "block" part, which is considered the basis of the full class name (e.g. <div
// class="block">)

export const Task4 = () => {
  function createBem() {
    const initialObj = {
      block: '',
      element: '',
      modifier: '',
    };

    let bem = initialObj;

    return {
      block: function (block) {
        bem.block = block;
        return this;
      },
      element: function (el) {
        bem.element = `__${el}`;
        return this;
      },
      modifier: function (mod) {
        bem.modifier = `-${mod}`;
        return this;
      },
      build: () => {
        let result = '';
        if (!bem.block) {
          result = 'Block must be added!';
        } else {
          result = `${bem.block}${bem.element}${bem.modifier}`;
        }
        bem = initialObj;
        return result;
      },
    };
  }

  const bem = createBem();
  const result = bem.block('list').element('item').modifier('active').build();

  return <div>{result}</div>;
};
