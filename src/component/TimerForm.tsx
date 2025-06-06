import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/TimerForm.css';

interface Props {
  handleSubmit: (seconds: number) => void;
  disableSubmit?: boolean;
}

function TimerForm({ handleSubmit, disableSubmit }: Props) {
  const formik = useFormik({
    initialValues: {
      minutes: 0,
      seconds: 0
    },
    validationSchema: Yup.object({
      minutes: Yup.number()
        .min(0, 'Число должно быть положительным')
        .max(59, 'Число должно быть меньше 59')
        .required('Обязательное поле'),
      seconds: Yup.number()
        .min(0, 'Число должно быть положительным')
        .max(59, 'Число должно быть меньше 59')
        .required('Обязательное поле')
    }),
    onSubmit: values => {
      handleSubmit(values.minutes * 60 + values.seconds);
    }
  });
  return (
    <form onSubmit={formik.handleSubmit} className={'timer-form'}>
      <div className={'timer-form__content'}>
        <div className={'timer-form__content__div'}>
          <label>Минуты</label>
          <input
            type="number"
            name="minutes"
            onChange={formik.handleChange}
            value={formik.values.minutes}
            placeholder="Минуты"
          />
          {formik.touched.minutes && formik.errors.minutes ? (
            <div>{formik.errors.minutes}</div>
          ) : null}
        </div>
        <div className={'timer-form__content__div'}>
          <label>Секунды</label>
          <input
            type="number"
            name="seconds"
            onChange={formik.handleChange}
            value={formik.values.seconds}
            placeholder="Секунды"
          />
          {formik.touched.seconds && formik.errors.seconds ? (
            <div>{formik.errors.seconds}</div>
          ) : null}
        </div>
      </div>
      <button type="submit" disabled={disableSubmit}>Создать таймер</button>
    </form>
  );
}

export default TimerForm;