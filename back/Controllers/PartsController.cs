using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wasp.Backend.DTOs;
using Wasp.Backend.Services;

namespace Wasp.Backend.Controllers
{
    [ApiController]
    [Route("api/parts")]
    public class PartsController : ControllerBase
    {
        private readonly IItemService _itemService;

        public PartsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<ItemBaseDto>>> GetParts([FromQuery] ItemFilterDto filter)
        {
            filter.Type = Enums.ItemType.Part;
            var result = await _itemService.GetItemsAsync(filter);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<PartDto>> GetPart(Guid id)
        {
            try
            {
                var item = await _itemService.GetItemByIdAsync(id);
                if (!(item is PartDto))
                    return NotFound(new { message = "Part not found" });

                return Ok(item as PartDto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Part not found" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<PartDto>> CreatePart([FromBody] PartDto partDto)
        {
            try
            {
                var createdPart = await _itemService.CreatePartAsync(partDto);
                return CreatedAtAction(nameof(GetPart), new { id = createdPart.Id }, createdPart);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdatePart(Guid id, [FromBody] PartDto partDto)
        {
            try
            {
                await _itemService.UpdatePartAsync(id, partDto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Part not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeletePart(Guid id)
        {
            try
            {
                var result = await _itemService.DeleteItemAsync(id);
                if (!result)
                    return NotFound(new { message = "Part not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
