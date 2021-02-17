import Alert from '@material-ui/lab/Alert'
import { CardComponent, TitleComponent } from '@components'

const AnalystContent = () => {
  const renderContent = () => {
    return (
      <div className="home-page-analyst-list">
        <Alert variant="outlined" severity="info">
          Ainda não há cliente para mostrar aqui.
        </Alert>
      </div>
    )
  }

  return (
    <div className="home-page-analyst">
      <CardComponent>
        <TitleComponent>Clientes</TitleComponent>
        {renderContent()}
      </CardComponent>
    </div>
  )
}

export { AnalystContent }
