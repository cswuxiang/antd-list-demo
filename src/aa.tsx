import React from 'react';

const AAForm: React.FC = () => {
  return (
    <form>
      <div>
        <label htmlFor="name">姓名：</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="email">邮箱：</label>
        <input type="email" id="email" name="email" />
      </div>
      <button type="submit">提交</button>
    </form>
  );
};

export default AAForm;