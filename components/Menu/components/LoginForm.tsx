import { Form, Formik } from "formik";
import { FormButton, Label, StyledError, StyledField, TertiaryFormButton } from "../../Styled/Form";
import { object, string as yupString } from "yup";
import { useUser } from "../../../utils/context/UserContext";
import { useDrawer } from "../../../utils/context/DrawerContext";

export type AuthFormProps = {
    setMode: React.Dispatch<React.SetStateAction<"REG" | "LOG">>;
}

const LoginForm = ({setMode}: AuthFormProps) => {
    const user = useUser()
    const drawer = useDrawer()
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        user.actions.login(values,() => {
            drawer.actions.setIsOpen(false)
        }, () => {})
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Label htmlFor="username" className="required">
            Email
          </Label>
          <StyledField
            type="email"
            className="mb-1"
            name="username"
            placeholder="Email"
          />
          <StyledError touched={touched.username}>{errors.username}</StyledError>
          <Label htmlFor="password" className="required">
            Lösenord
          </Label>
          <StyledField
            className="mb-1"
            name="password"
            type="password"
            placeholder="Lösenord"
          />
          <StyledError touched={touched.password}>
            {errors.password}
          </StyledError>
          <FormButton className="mt-3" type="submit">
            Logga in
          </FormButton>

          <TertiaryFormButton type="button" onClick={() => setMode("REG")}>Eller registrera</TertiaryFormButton>
        </Form>
      )}
    </Formik>
  );
};

const loginSchema = object({
  username: yupString()
    .email("Email: Giltig mailadress")
    .required("Fyll i ett värde"),
  password: yupString()
    .min(8, "Lösenord: minst 8 tecken")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Lösenord: minst en bokstav och siffra "
    )
    .required("Fyll i ett värde"),
});

export default LoginForm;
