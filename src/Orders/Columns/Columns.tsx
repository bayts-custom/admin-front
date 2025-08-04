import { useState } from 'react';
import './Columns.css';
import { Translate, translate } from '../../translate';
import { OverflowDialog } from '../../components/OverflowDialog';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export type Item = {
    id: number;
    name: string;
    show: boolean;
};

type ColumnsProps = {
    setItems: (items: Item[]) => void;
    items: Item[];
};

export const Columns = ({ setItems, items }: ColumnsProps) => {
    const [columns, setColumns] = useState(items);

    const t = translate.order as Translate;

    const [dragState, setDragState] = useState<{
        draggingItem: Item | null;
        newItemName: '';
        newItemImage: '';
    }>({
        draggingItem: null,
        newItemName: '',
        newItemImage: '',
    });

    const handleDragStart = (e: any, item: Item) => {
        setDragState((prev) => ({
            ...prev,
            draggingItem: item,
        }));
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragEnd = () => {
        setDragState((prev) => ({
            ...prev,
            draggingItem: null,
        }));
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = (e: any, targetItem: Item) => {
        const { draggingItem } = dragState;
        if (!draggingItem) return;

        const currentIndex = columns.indexOf(draggingItem);
        const targetIndex = columns.indexOf(targetItem);

        if (currentIndex !== -1 && targetIndex !== -1) {
            columns.splice(currentIndex, 1);
            columns.splice(targetIndex, 0, draggingItem);
            setColumns([...columns]);
        }
    };

    const handleConfirm = () => {
        setItems(columns);
    };
    const handleCancel = () => {
        setColumns([...items]);
    };

    const handleShowChange = (item: Item) => {
        setColumns(
            columns.map(({ id, name, show }) => ({
                id,
                name,
                show: item.id === id ? !show : show,
            })),
        );
    };

    return (
        <OverflowDialog onConfirm={handleConfirm} onCancel={handleCancel} triggerComponent={() => <FilterListIcon />}>
            <div className="sortable-list">
                {columns.map((item) => (
                    <div
                        key={item.id}
                        className="item"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, item)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, item)}
                    >
                        <div className="details">
                            <div>{t[item.name]}</div>
                            <div onClick={() => handleShowChange(item)}>
                                {item.show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </OverflowDialog>
    );
};
