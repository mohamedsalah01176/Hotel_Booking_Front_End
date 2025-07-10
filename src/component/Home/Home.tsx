import { useTranslation } from "react-i18next"

const Home = () => {

  const {t}=useTranslation()
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        {t('navbar')}
    </h1>
    </div>
  )
}

export default Home
