<table id="table">
    <thead>
    <tr>
        <th class="val" scope="col">X</th>
        <th class="val" scope="col">Y</th>
        <th class="val" scope="col">R</th>
        <th class="val" scope="col">Время</th>
        <th class="val" scope="col">Время исполнения</th>
        <th class="val" scope="col">Результат</th>
    </tr>
    </thead>
    <tbody id="table-body">
    <?php
    foreach (array_reverse($_SESSION['client']) as $val) { ?>
        <tr>
            <th class="val" scope="col"><?php echo $val[0] ?></th>
            <th class="val" scope="col"><?php echo $val[1] ?></th>
            <th class="val" scope="col"><?php echo $val[2] ?></th>
            <th class="val" scope="col"><?php echo $val[3] ?></th>
            <th class="val" scope="col"><?php echo $val[4] ?></th>
            <th class="val-<?php echo $val[5] == "HIT" ? "gr" : "red" ?>" scope="col"><?php echo $val[5] ?></th>
        </tr>
    <?php } ?>
    </tbody>
</table>
