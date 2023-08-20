import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { GETEntriesForSnapshot, GETLatestMetric, GETMetricTypes, GETSnapshotByID, POSTMetricEntry, POSTMetricSnapshot, PUTMetricEntry, PUTMetricSnapshot } from '../../apis/metric';
import Paper from '@mui/material/Paper';
import Table from '../table/basic-table';
import { DATA_PERIOD_OPTIONS } from '../../utils/constants';

interface Props {
    snapshot_id: string
}

const MetricEntriesList = ({snapshot_id}: Props) => {

    const [types, setTypes] = useState<any[]>([])
    const [typesMap, setTypesMap] = useState<any>({})
    const [entries, setEntries] = useState<any[]>([])

    useEffect(() => {
        GETMetricTypes()
        .then((resp) => {
            setTypes(resp.data)

            resp.data.forEach((type: any) => {
                typesMap[type.id] = type.label
            })
        })
        .catch((err) => {
            console.log(err)
        })

        GETEntriesForSnapshot(snapshot_id)
        .then((resp) => {
            setEntries(resp.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const setTypeIDs = entries.map((entry) => entry.metric_type_id)

    const unSetTypes = types.filter((type) => !setTypeIDs.includes(type.id))

    const handleAdd = unSetTypes.length == 0 ? undefined : () => {
        const newType = unSetTypes[0]
        
        POSTMetricEntry({
            metric_snapshot_id: snapshot_id,
            metric_type_id: newType.id,
        }).then((resp) => {
            entries.push(resp.data)
            setEntries([...entries])
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <Box
            width={"100%"}
        >
            <Paper elevation={2} sx={{minHeight: 200, px: 3, py: 2}}>
                <Table
                columns={[{
                    label: 'Metric Type',
                    dataKey: 'metric_type_id',
                    editable: true,
                    options: unSetTypes.map((t) => ({label: t.label, value: t.id})),
                    valueToLabelMap: typesMap,
                },
                {
                    label: 'Value',
                    dataKey: 'value',
                    editable: true,
                    type: 'number',
                },
                {
                    label: 'Data Period',
                    dataKey: 'value_type',
                    editable: true,
                    options: DATA_PERIOD_OPTIONS
                }]}
                data={entries}
                handleAdd={handleAdd}
                getID={(entry) => entry.metric_type_id}
                onFieldChange={(entry_id, key, newValue) => {

                    const entry = entries.find((e) => e.metric_type_id == entry_id)
                    if (!entry) return

                    const original_metric_type_id = entry.metric_type_id

                    if (key == 'value') entry[key] = parseFloat(newValue)
                    else entry[key] = newValue

                    PUTMetricEntry(snapshot_id, original_metric_type_id, entry)
                    .then((resp) => {
                        const newEntry = resp.data

                        setEntries(entries.map((e) => {
                            if (e.metric_type_id == newEntry.metric_type_id) return newEntry
                            return e
                        }))
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }}
                />
            </Paper>
        </Box>
    )

}

export default MetricEntriesList