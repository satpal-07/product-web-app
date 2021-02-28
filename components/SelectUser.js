import styles from '../styles/SelectUser.module.css'
export default function SelectUser({ userId }) {
  const availableUserIds = [1, 2, 3, 4, 5];
  const defaultValue = userId ? userId : 'Select an User ID';
  const options = [<option key={0} value='before'>
    Select an User ID
  </option>];
  availableUserIds.forEach(function (id) {
    options.push(
      <option className={styles.option} key={id} value={id}>
        {id}
      </option>
    );
  });
  return (
    <div className={styles['form-wrapper']}>
      <form action='/' className={styles.form}>
        <label>Choose a User:</label>
        <select defaultValue={defaultValue} name='userId' id='userId' className={styles.select}>
          {options}
        </select>
        <input type='submit' value='Submit' className={styles.submit} />
      </form>
    </div>
  );
}
