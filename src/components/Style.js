import styled from 'styled-components';
import poole from '../css/poole.css';
import main from '../css/main.css';

const PooleComponent = styled.div(poole);

export default styled(PooleComponent)(main);
