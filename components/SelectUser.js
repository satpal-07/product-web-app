import Constants from '../contants';
import styles from '../styles/SelectUser.module.css';

export default function SelectUser({ userId }) {
  const userIds = Constants.USER_IDS;
  const defaultValue = userId ? userId : 'Select an User ID';
  // set the initially selected option
  const options = [
    <option key={0} value='before'>
      Select User ID
    </option>,
  ];
  // add the rest of the options
  userIds.forEach(function (id) {
    options.push(
      <option key={id} value={id}>
        {`User ID: ${id}`}
      </option>
    );
  });

  return (
    <div className={styles['form-wrapper']}>
      <form action='/'>
        <label className={styles.label}>Choose a User:</label>
        <select
          defaultValue={defaultValue}
          name='userId'
          id='userId'
          className={styles.select}
        >
          {options}
        </select>
        <input type='submit' value='Apply' className={styles.submit} />
      </form>
    </div>
  );
}
